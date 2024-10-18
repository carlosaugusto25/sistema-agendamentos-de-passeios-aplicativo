import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "../../components/Header";
import { CardInfo, Container, Content, ContentButtons, ContentButtonsModalDelete, ContentButtonsModalEdit, ContentModalEdit, Info, Label, LabelAndInfo, Line, NameClient, TextModalDelete } from "./styles";
import { AdditionalProps, GetAppointmentsProps, GetBoatProps, GetBoatPropsSelection, GetBoatSelection } from "../../@types/interfaces/types";
import { api } from "../../service/api";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { maskCpf, maskDate, maskPhone } from "../../utils/masks";
import { RFValue } from "react-native-responsive-fontsize";
import { Loading } from "../../components/Loading";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import { Selection } from "../../components/Selection";
import theme from "../../theme";
import { SelectionBoat } from "../../components/SelecionBoat";
import { InputAndIconBlue } from "../../components/InputAndIconBlue";
import { InputAndIconBlueMask } from "../../components/InputAndIconBlueMask";
import { SelectionTurn } from "../../components/SelecionTurn";
import { SelectionCondionalPayment } from "../../components/SelecionConditionalPayment";
import { addDays, format, set } from "date-fns";
import { CheckAndOption, CheckBox, IconCheck, TextOption, TitleScreen } from "../NewScheduling/styles";

export function SchedulingDetails({ route }: any) {

    const navigation = useNavigation<any>();

    const [apointmentShow, setAppointmentShow] = useState<GetAppointmentsProps>({} as GetAppointmentsProps);
    const [appointments, setAppointments] = useState<GetAppointmentsProps[]>([])
    const [boats, setBoats] = useState<GetBoatPropsSelection[]>([])
    const [aditionals, setAditionals] = useState<AdditionalProps[]>([])
    const [loading, setLoading] = useState(false);
    const [loadingPDF, setLoadingPDF] = useState(false)

    const [dateString, setDateString] = useState('')

    const [editIdAppointment, setEditIdAppointment] = useState('')
    const [editDateAppointment, setEditDateAppointment] = useState('')
    const [editTurnAppointment, setEditTurnAppointment] = useState<'MORNING' | 'AFTERNOON' | 'DAY' | undefined>(undefined)
    const [editBoatAppointment, setEditBoatAppointment] = useState<GetBoatPropsSelection>({} as GetBoatPropsSelection)
    const [editAdditionalAppointment, setEditAdditionalAppointment] = useState([''])
    const [editQuantityAppointment, setEditQuantityAppointment] = useState('')
    const [editValueAppointment, setEditValueAppointment] = useState('')
    const [editPaidAppointment, setEditPaidAppointment] = useState('')
    const [editCpfAppointment, setEditCpfAppointment] = useState('')
    const [editNameAppointment, setEditNameAppointment] = useState('')
    const [editPhoneAppointment, setEditPhoneAppointment] = useState('')
    const [editEmailAppointment, setEditEmailAppointment] = useState('')
    const [editPaymentAppointment, setEditPaymentAppointment] = useState<'PIX' | 'MONEY' | 'CREDCARD' | undefined>(undefined)

    const [modalDelete, setModalDelete] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [openSelectBoat, setOpenSelectBoat] = useState(false)
    const [openTurn, setOpenTurn] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)

    const loadSchedulingShow = useCallback(async () => {
        setLoading(true)
        await api.get(``).then((response) => {
            setAppointmentShow(response.data)
            setDateString(response.data.date.split('-'))
        }).catch(error => {
            console.log(error)
        }).finally(() => { setLoading(false) })
    }, [])

    const loadSchedulings = useCallback(async () => {
        await api.get('').then(res => {
            setAppointments(res.data)
        }).catch(erro => console.log(erro))
    }, [])

    const loadBoat = useCallback(async () => {
        await api.get('').then(res => {
            setBoats(res.data)
        }).catch(erro => console.log(erro))
    }, [])

    const loadAditionals = useCallback(async () => {
        await api.get('').then(res => {
            setAditionals(res.data)
        }).catch(erro => console.log(erro))
    }, [])

    const aditionalMemo = useMemo(() => {
        return apointmentShow?.additionals?.map(add => {
            return add.additional_id
        })
    }, [apointmentShow])

    useEffect(() => {
        loadSchedulingShow()
        loadAditionals()
        loadSchedulings()
        loadBoat()
    }, [])

    const baixarECompartilharPDF = async () => {
        setLoadingPDF(true)
        const response = await api.get(``)
        if (response.data.includes('base64,')) {
            const base64String = response.data.split(',')[1].trim();

            try {
                const pdfUri = `${FileSystem.documentDirectory
                    }nota_${new Date().getTime()}.pdf`;

                await FileSystem.writeAsStringAsync(pdfUri, base64String, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                await Sharing.shareAsync(pdfUri);
                setLoadingPDF(false)
                // console.log("Arquivo PDF salvo com sucesso em:", pdfUri);
            } catch (error) {
                console.error('Erro ao decodificar e salvar o arquivo PDF:', error);
                setLoadingPDF(false)
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Erro',
                    textBody: 'Não foi possível gerar o voucher',
                })
            }
        } else {
            console.error('Base64 prefix not found in response');
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Erro',
                textBody: 'Algo de inesperado aconteceu. Tente novamente',
            })
            setLoadingPDF(false)
        }
        return;
    };

    const addAditional = useCallback((value: string) => {
        if (editAdditionalAppointment.includes(value)) {
            setEditAdditionalAppointment(editAdditionalAppointment.filter(item => item !== value))
        } else {
            setEditAdditionalAppointment([...editAdditionalAppointment, value])
        }


    }, [editAdditionalAppointment])

    const valueTotal = useMemo(() => {
        let total = Number(editValueAppointment) * 100
        aditionals.map((item) => {
            if (editAdditionalAppointment.includes(item.id)) {
                total += Number(item.value)
            }
        })
        return total
    }, [editValueAppointment, editAdditionalAppointment, aditionals])

    const handleDeleteAppointment = useCallback(() => {
        setModalDelete(false)
        setLoading(true)
        api.delete(``).then(() => {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Sucesso',
                textBody: 'Agendamento excluído com sucesso',
            })
            navigation.goBack()
        }).catch(error => {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Erro',
                textBody: 'Erro ao excluir o agendamento',
            })
            console.log(error)
        }).finally(() => setLoading(false))
    }, [apointmentShow])

    const loadEditInfos = useCallback(() => {
        setEditIdAppointment(apointmentShow?.id)
        setEditDateAppointment(apointmentShow?.date ? apointmentShow?.date.split('-').reverse().join('-') : '')
        setEditTurnAppointment(apointmentShow?.turn === 'MORNING' ? 'MORNING' : (apointmentShow?.turn === 'AFTERNOON' ? 'AFTERNOON' : 'DAY'))
        setEditBoatAppointment(apointmentShow?.speedboat)
        setEditAdditionalAppointment(apointmentShow?.additionals.map(add => add.additional_id))
        setEditQuantityAppointment(`${apointmentShow?.people_quantity}`)
        setEditValueAppointment(`${apointmentShow?.total_value / 100}`)
        setEditPaidAppointment(`${apointmentShow?.value / 100}`)
        setEditNameAppointment(apointmentShow?.client_name)
        setEditCpfAppointment(apointmentShow?.client_document)
        setEditPhoneAppointment(apointmentShow?.client_phone)
        setEditEmailAppointment(apointmentShow?.client_email)
        setEditPaymentAppointment(apointmentShow?.payment_type === 'PIX' ? 'PIX' : (apointmentShow?.payment_type === 'MONEY' ? 'MONEY' : 'CREDCARD'))
    }, [apointmentShow])

    const deleteInfos = useCallback(() => {
        setEditIdAppointment('')
        setEditDateAppointment('')
        setEditTurnAppointment(undefined)
        setEditBoatAppointment({} as GetBoatPropsSelection)
        setEditAdditionalAppointment([''])
        setEditQuantityAppointment('')
        setEditValueAppointment('')
        setEditPaidAppointment('')
        setEditNameAppointment('')
        setEditPhoneAppointment('')
        setEditEmailAppointment('')
        setEditPaymentAppointment(undefined)
        setEditCpfAppointment('')
    }, [])

    const handleEditAppointment = useCallback(async () => {
        let maxPeopleBoat = false
        let unavailableBoat = false
        let unavailableDayBoat = false

        if (editDateAppointment === '' || editNameAppointment === '' || editValueAppointment === '' || editQuantityAppointment === '' || editPhoneAppointment === '' || editTurnAppointment === undefined || editPaymentAppointment === undefined || editBoatAppointment.id === '') {
            return Toast.show({ type: ALERT_TYPE.DANGER, title: 'Erro', textBody: 'Preencha todos os campos.' })
        }

        if(editBoatAppointment.id !== apointmentShow?.speedboat_id || editTurnAppointment !== apointmentShow?.turn || editDateAppointment.split('-').reverse().join('-') !== apointmentShow?.date) {
            appointments.map((item) => {
                console.log(item.date, editDateAppointment.split('-').reverse().join('-'))
                if (item.date === editDateAppointment.split('-').reverse().join('-') && editTurnAppointment === item.turn && item.speedboat_id === editBoatAppointment.id && item.id !== apointmentShow?.id) {
                    return unavailableBoat = true
                } else if (item.date === editDateAppointment.split('-').reverse().join('-') && item.turn === 'DAY' && item.speedboat_id === editBoatAppointment.id && item.id !== apointmentShow?.id) {
                    return unavailableDayBoat = true
                }
            }) 
        }
        

        if (unavailableDayBoat) {
            return Toast.show({ type: ALERT_TYPE.DANGER, title: 'Erro', textBody: 'Dia indisponível nesta lancha para esta data.' })
        }

        if (unavailableBoat) {
            return Toast.show({ type: ALERT_TYPE.DANGER, title: 'Erro', textBody: 'Horário indisponível nesta lancha para esta data.' })
        }

        boats.map((boat) => {
            if (boat.id === editBoatAppointment.id && Number(editQuantityAppointment) > boat.max_people) {
                return maxPeopleBoat = true
            }
        })

        if (maxPeopleBoat) {
            return Toast.show({ type: ALERT_TYPE.DANGER, title: 'Erro', textBody: 'Capacidade da lancha excedida.' })
        }

        const obj = {
            id: editIdAppointment,
            date: editDateAppointment.split('-').reverse().join('-'),
            turn: editTurnAppointment,
            people_quantity: Number(editQuantityAppointment),
            client_name: editNameAppointment,
            client_email: editEmailAppointment,
            client_phone: editPhoneAppointment,
            client_document: editCpfAppointment,
            payment_type: editPaymentAppointment,
            value: Number(editPaidAppointment) * 100,
            total_value: valueTotal,
            speedboat_id: editBoatAppointment.id,
            additionals: editAdditionalAppointment
        }
        setLoading(true)
        await api.put('',  obj ).then(() => {
            setModalEdit(false)
            Toast.show({ type: ALERT_TYPE.SUCCESS, title: 'Sucesso', textBody: 'Agendamento editado com sucesso.' })
            loadSchedulingShow()
            deleteInfos()
        }).catch(error => {
            console.log(error)
            Toast.show({ type: ALERT_TYPE.DANGER, title: 'Erro', textBody: 'Erro ao editar agendamento.' })
        }).finally(() => {
            setLoading(false)
        })
    }, [
        appointments,
        boats,
        editAdditionalAppointment,
        editBoatAppointment,
        editDateAppointment,
        editEmailAppointment,
        editIdAppointment,
        editNameAppointment,
        editPaidAppointment,
        editCpfAppointment,
        editPaymentAppointment,
        editPhoneAppointment,
        editQuantityAppointment,
        editTurnAppointment,
        editValueAppointment,
        loadSchedulingShow,
        deleteInfos,
        valueTotal
    ])

    return (
        <Container>
            <Header nameScreen="Detalhes" leftIcon leftNameIcon="edit" rigthIcon rightNameIcon="trash-alt" onPressRight={() => setModalDelete(true)} onPressLeft={() => { setModalEdit(true); loadEditInfos() }} />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Content>
                        <CardInfo>
                            <NameClient>{apointmentShow?.client_name ? apointmentShow?.client_name : 'Não informado'}</NameClient>
                        </CardInfo>
                        <CardInfo>
                            <Line>
                                <LabelAndInfo>
                                    <Label>CPF</Label>
                                    <Info>{apointmentShow?.client_document ? maskCpf(apointmentShow?.client_document) : 'Não informado'}</Info>
                                </LabelAndInfo>
                                <LabelAndInfo>
                                    <Label>Contato</Label>
                                    <Info>{apointmentShow?.client_phone ? maskPhone(apointmentShow?.client_phone) : 'Não informado'}</Info>
                                </LabelAndInfo>
                            </Line>
                            <LabelAndInfo style={{ marginTop: RFValue(10) }}>
                                <Label>E-mail</Label>
                                <Info>{apointmentShow?.client_email ? apointmentShow?.client_email : 'Não informmado'}</Info>
                            </LabelAndInfo>
                        </CardInfo>
                        <CardInfo>
                            <Line>
                                <LabelAndInfo>
                                    <Label>Data</Label>
                                    <Info>{`${dateString[2]}/${dateString[1]}/${dateString[0]}`}</Info>
                                </LabelAndInfo>
                                <LabelAndInfo>
                                    <Label>Quantidade</Label>
                                    <Info>{apointmentShow?.people_quantity ? apointmentShow?.people_quantity : ''}</Info>
                                </LabelAndInfo>
                                <LabelAndInfo>
                                    <Label>Período</Label>
                                    <Info>{apointmentShow?.turn === 'MORNING' ? 'Manhã' : (apointmentShow?.turn === 'AFTERNOON' ? 'Tarde' : 'Dia inteiro')}</Info>
                                </LabelAndInfo>
                            </Line>
                            <LabelAndInfo style={{ marginTop: RFValue(10) }}>
                                <Label>Embarcação</Label>
                                <NameClient>{apointmentShow?.speedboat?.name ? apointmentShow?.speedboat?.name : 'Não informado'}</NameClient>
                            </LabelAndInfo>
                        </CardInfo>
                        <CardInfo>
                            <Line>
                                <LabelAndInfo>
                                    <Label>Entrada:</Label>
                                    <Info>{apointmentShow?.value ? new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(apointmentShow?.value / 100) : 'Não informado'}</Info>
                                </LabelAndInfo>
                                <LabelAndInfo>
                                    <Label>Adicionais</Label>
                                    <Info>{apointmentShow?.additionals ? apointmentShow?.additionals?.length : 0}</Info>
                                </LabelAndInfo>
                                <LabelAndInfo>
                                    <Label>Total</Label>
                                    <Info>{apointmentShow?.total_value ? new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(apointmentShow?.total_value / 100) : 'Não informado'}</Info>
                                </LabelAndInfo>
                            </Line>
                            <LabelAndInfo style={{ marginTop: RFValue(10) }}>
                                <Label>Forma de Pagamento</Label>
                                <NameClient>{apointmentShow?.payment_type === 'PIX' ? 'Pix' : (apointmentShow?.payment_type === 'MONEY' ? 'Dinheiro' : (apointmentShow?.payment_type === 'CREDCARD' ? 'Cartão de Crédito' : 'Não informmado'))}</NameClient>
                            </LabelAndInfo>
                        </CardInfo>
                        <CardInfo>
                            <Line>
                                <LabelAndInfo>
                                    <Label>Criado por:</Label>
                                    <Info>{apointmentShow?.user?.name ? apointmentShow?.user?.name : 'Não informado'}</Info>
                                </LabelAndInfo>
                                <LabelAndInfo>
                                    <Label>Criado em:</Label>
                                    <Info>{new Date(apointmentShow?.created_at).toLocaleString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}</Info>
                                </LabelAndInfo>
                            </Line>
                        </CardInfo>
                        <CardInfo style={{ marginBottom: RFValue(10) }}>
                            <Label>Adicionais</Label>
                            {aditionals ? aditionals.map(add => {
                                if (aditionalMemo.includes(add.id)) {
                                    return (
                                        <Line key={add.id}>
                                            <Info>{add?.name}</Info>
                                            <Info>{new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(add?.value / 100)}</Info>
                                        </Line>
                                    )
                                }
                            }) : <Info>Sem adicionais</Info>}
                        </CardInfo>
                        <View style={{ marginBottom: RFValue(10), backgroundColor: 'transparent', width: '100%', height: RFValue(1) }} />
                    </Content>
                    <ContentButtons>
                        <ButtonComponent style={{ width: '20%' }} icon nameIcon="chevron-left" onPress={() => navigation.goBack()} />
                        <ButtonComponent style={{ width: '77%' }} loading={loadingPDF} iconAndText nameIcon="file-pdf" text='Voucher' onPress={baixarECompartilharPDF} />
                    </ContentButtons>
                    <Selection height={250} open={modalDelete} setOpen={setModalDelete} titleModal='Excluir Passeio'>
                        <TextModalDelete>Tem certeza que deseja excluir o passeio?</TextModalDelete>
                        <ContentButtonsModalDelete>
                            <ButtonComponent textOnly text='Cancelar' style={{ width: '48%', backgroundColor: theme.COLORS.SUBTITLE }} onPress={() => setModalDelete(false)} />
                            <ButtonComponent textOnly text='Excluir' style={{ backgroundColor: theme.COLORS.DELETE, width: '48%' }} onPress={handleDeleteAppointment} />
                        </ContentButtonsModalDelete>
                    </Selection>
                    <Selection height={600} open={modalEdit} setOpen={setModalEdit} titleModal='Editar Passeio'>
                        <KeyboardAvoidingView behavior={'padding'} enabled keyboardVerticalOffset={200} style={{ flex: 1 }}>
                            <ContentModalEdit>
                                <SelectionBoat onPress={() => setOpenSelectBoat(true)} open={openSelectBoat} setOpen={setOpenSelectBoat} setBoatSelected={setEditBoatAppointment} boatSelected={editBoatAppointment} />
                                <InputAndIconBlue value={editNameAppointment} onChangeText={setEditNameAppointment} placeHolder="Nome" icon nameIcon="user-alt" marginBotton={5} />
                                <InputAndIconBlueMask type="cpf" value={editCpfAppointment} onChangeText={(e)=>setEditCpfAppointment(e.replace(/\D/g, ''))} placeHolder="CPF" icon nameIcon="address-card" marginTop={5} marginBotton={5} keyboardType="numeric" />
                                <InputAndIconBlue value={editEmailAppointment} autoCapitalize="none" onChangeText={setEditEmailAppointment} placeHolder="E-mail" icon nameIcon="envelope" marginTop={5} marginBotton={5} keyboardType="email-address" />
                                <InputAndIconBlueMask type='cel-phone' options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }} value={editPhoneAppointment} onChangeText={(e) => setEditPhoneAppointment(e.replace(/\D/g, ''))} placeHolder="Contato" icon nameIcon="phone-alt" marginTop={5} marginBotton={5} keyboardType="numeric" />
                                <SelectionTurn onPress={() => setOpenTurn(true)} open={openTurn} setOpen={setOpenTurn} turn={editTurnAppointment} setTurn={setEditTurnAppointment} />
                                <InputAndIconBlue value={editValueAppointment} onChangeText={setEditValueAppointment} placeHolder="Valor" icon nameIcon="dollar-sign" marginTop={5} marginBotton={5} keyboardType="numeric" />
                                <SelectionCondionalPayment onPress={() => setOpenPayment(true)} open={openPayment} setOpen={setOpenPayment} conditionalPaymentSelected={editPaymentAppointment} setConditionalPaymentSelected={setEditPaymentAppointment} />
                                <InputAndIconBlue value={editQuantityAppointment} onChangeText={setEditQuantityAppointment} placeHolder="Quantidade de Passageiros" icon nameIcon="user-friends" marginTop={5} marginBotton={5} keyboardType="numeric" />
                                <InputAndIconBlue value={editPaidAppointment} onChangeText={setEditPaidAppointment} placeHolder="Valor pago na reserva" icon nameIcon="ticket-alt" marginTop={5} marginBotton={5} keyboardType="numeric" />
                                <InputAndIconBlueMask type="datetime" options={{ format: 'DD/MM/YYYY' }} value={editDateAppointment} onChangeText={setEditDateAppointment} placeHolder="Data" icon nameIcon="calendar-alt" marginTop={5} marginBotton={5} />
                                {/* <InputAndIconBlue value={maskDate(editDateAppointment)} onChangeText={(e)=>setEditDateAppointment( e.replace(/\D/g, ''))} placeHolder={'Data'} keyboardType="numeric" icon nameIcon="calendar-alt" marginTop={5} /> */}
                                <TitleScreen>Extras</TitleScreen>
                                {
                                    aditionals.map((aditional, index) => (
                                        <CheckAndOption marginBotton={5} key={aditional.id}>
                                            <CheckBox onPress={() => addAditional(aditional.id)} color={theme.COLORS.CHECKBOX}>
                                                {editAdditionalAppointment.includes(aditional.id) && <IconCheck key={aditional.id} fontSize={20} width={20} name="check" />}
                                            </CheckBox>
                                            <TextOption>{aditional.name} / {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(aditional.value / 100)}</TextOption>
                                        </CheckAndOption>
                                    ))
                                }
                                <View style={{ width: '100%', height: 30, backgroundColor: 'transparent' }} />
                            </ContentModalEdit>
                        </KeyboardAvoidingView>
                        <ContentButtonsModalEdit>
                            <ButtonComponent textOnly text='Cancelar' style={{ width: '48%', backgroundColor: theme.COLORS.SUBTITLE }} onPress={() => { setModalEdit(false); deleteInfos() }} />
                            <ButtonComponent textOnly text='Salvar' style={{ backgroundColor: theme.COLORS.PRIMARY_GREEN, width: '48%' }} onPress={handleEditAppointment} />
                        </ContentButtonsModalEdit>
                    </Selection>
                </>
            )}
        </Container>
    )
}