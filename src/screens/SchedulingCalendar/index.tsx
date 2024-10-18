import { useTheme } from "styled-components";
import { Header } from "../../components/Header";
import { BoatEvent, BoxCalendar, ButtonComponent, CardEvent, ColorBoat, Container, ContentButtonsModal, ContentHeader, ContentList, ContentModal, DateDay, DateEvent, HeaderModal, IconButtonModal, Icons, LegendBoat, NameAndColor, NameBoat, NameDay, OutModal, TextButton, TextNoEvent, TitleEvent, Traco } from "./styles";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Modal, Text, TouchableOpacity, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetAppointmentsProps, GetBoatProps } from "../../@types/interfaces/types";
import { api } from "../../service/api";
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import theme from "../../theme";
import bg from '../../assets/top-header.png';
import { Loading } from "../../components/Loading";

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
    today: 'Hoje',
}
LocaleConfig.defaultLocale = 'pt-br';

export function SchedulingCalendar() {

    const { COLORS, FONT_FAMILY } = useTheme();

    const navigation = useNavigation<any>();

    const isFocused = useIsFocused();

    const nameDay = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingBoat, setLoadingBoat] = useState(false);
    const [dateSelected, setDateSelected] = useState<string | undefined>();
    const [appointments, setAppointments] = useState<GetAppointmentsProps[]>([]);
    const [boat, setBoat] = useState<GetBoatProps[]>([]);

    function openModal(value: string | undefined) {
        setModal(true)
        setDateSelected(value)
    }

    const loadData = useCallback(async () => {
        setLoading(true);
        await api.get('').then((response) => {
            setAppointments(response.data)
        }).catch(error => console.log(error)).finally(() => setLoading(false))
    }, [])

    const loadBoat = useCallback(async () => {
        setLoadingBoat(true);
        await api.get('').then((response) => {
            setBoat(response.data)
        }).catch(error => console.log(error)).finally(() => setLoadingBoat(false))
    }, [])

    useEffect(() => {
        loadData()
        loadBoat()
    }, [isFocused])

    function dataComponent(date: string | undefined) {
        const aux = appointments.filter(e => (e.date === date))

        const b = aux.map((a, index) => {
            if (index < 4) {
                return (
                    <View key={a.id}>
                        <View key={a.id} style={{
                            height: RFValue(12),
                            backgroundColor: date && date < new Date().toISOString().split('T')[0] ? 'gray' : (index === 3 ? COLORS.PRIMARY_GREEN : (a?.additionals?.length > 0 ? '#FC7B01' : a?.speedboat?.color)),
                            borderRadius: RFValue(3),
                            paddingLeft: RFValue(2),
                            paddingBottom: RFValue(2),
                            marginBottom: RFValue(2),
                            alignItems: 'center'
                        }}>
                            <Text numberOfLines={1} style={{ color: '#FFF', fontSize: RFValue(8), fontFamily: FONT_FAMILY.LEXEND_SEMIBOLD, textAlign: index === 3 ? 'center' : 'left' }}>{index === 3 ? '+ mais' : a.client_name}</Text>
                        </View>
                    </View>
                )
            }
        })
        return b
    }

    const EventsSelected: GetAppointmentsProps[] = useMemo(() => {
        const eventSelect = appointments?.filter(ev => {
            return ev.date === dateSelected
        })
        return eventSelect
    }, [appointments, dateSelected])

    return (
        <Container>
            <Header nameScreen="Calendário de passeios" />
            {
                loading && loadingBoat ?
                    <Loading />
                    :
                    <>
                        <BoxCalendar>
                            <Calendar
                                style={{
                                    justifyContent: 'space-between',
                                    borderRadius: 8
                                }}
                                theme={{
                                    textDayFontFamily: FONT_FAMILY.INTER_REGULAR,
                                    textMonthFontFamily: FONT_FAMILY.INTER_BOLD,
                                    textMonthFontSize: 20,
                                    dayTextColor: COLORS.PRIMARY_BLUE,
                                    monthTextColor: COLORS.PRIMARY_BLUE,
                                    backgroundColor: COLORS.BACKGROUND,
                                    calendarBackground: COLORS.BACKGROUND,
                                }}
                                renderArrow={(direction: any) => <FontAwesome name={direction === 'left' ? 'chevron-left' : 'chevron-right'} size={25} color={COLORS.SECONDARY_BLUE} />}
                                dayComponent={({ date, state, marking }: any) => {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                height: RFValue(60),
                                                display: 'flex',
                                                flexDirection: "column",
                                                marginHorizontal: RFValue(2),
                                                backgroundColor: state === 'today' ? COLORS.GRAY_LIGHT : '',
                                                width: RFValue(40),
                                                borderRadius: RFValue(5),
                                                marginBottom: RFValue(5)
                                            }}
                                            onPress={() => openModal(date?.dateString)}
                                        >
                                            <Text style={{
                                                textAlign: 'center',
                                                color: state === 'disabled' ? 'gray' : (state === 'today' ? 'blue' : COLORS.PRIMARY_BLUE),
                                                fontFamily: FONT_FAMILY.INTER_REGULAR,
                                                fontSize: RFValue(14),
                                            }}>
                                                {date?.day}
                                            </Text>
                                            {
                                                dataComponent(date?.dateString)
                                            }

                                        </TouchableOpacity>
                                    )
                                }}
                                minDate={`${new Date()}`}
                                markingType="multi-period"
                            />
                        </BoxCalendar>
                        <LegendBoat>
                            {
                                boat.map(boat => (
                                    <NameAndColor key={boat.id}>
                                        <NameBoat>{boat.name}</NameBoat>
                                        <ColorBoat color={boat.color} />
                                    </NameAndColor>
                                ))
                            }
                        </LegendBoat>
                    </>
            }

            <Modal
                visible={modal}
                onRequestClose={() => setModal(false)}
                transparent
                animationType="fade"
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}
            >
                <OutModal>
                    <ContentModal>
                        <HeaderModal source={bg}>
                            <ContentHeader>
                                <DateDay>{dateSelected?.split('-')[2]}</DateDay>
                                <NameDay>{nameDay[new Date(dateSelected !== undefined ? dateSelected : '').getDay()]}</NameDay>
                            </ContentHeader>
                            <Traco />
                        </HeaderModal>
                        <ContentList>
                            {
                                EventsSelected?.length === 0 ?
                                    <TextNoEvent>Não há eventos para este dia</TextNoEvent> :
                                    <>
                                        {
                                            EventsSelected?.map((ev, index) => (
                                                <CardEvent key={ev.id} color={ev.date && ev.date < new Date().toISOString().split('T')[0] ? 'gray' : (ev?.additionals?.length > 0 ? '#FC7B01' : ev?.speedboat?.color)} onPress={() => { navigation.navigate('SchedulingDetails', { paramKey: ev.id }); setModal(false) }}>
                                                    <View>
                                                        <TitleEvent numberOfLines={1}>{ev.client_name}</TitleEvent>
                                                        <DateEvent>{ev.turn === 'MORNING' ? 'Manhã' : (ev.turn === 'AFTERNOON' ? 'Tarde' : 'Dia inteiro')} - <BoatEvent>{ev.speedboat.name}</BoatEvent></DateEvent>
                                                    </View>
                                                    <Icons name='angle-double-right' />
                                                </CardEvent>
                                            ))
                                        }
                                    </>
                            }
                        </ContentList>
                        <ContentButtonsModal>

                            <ButtonComponent width="160px" color={theme.COLORS.INPUT_BORDER} onPress={() => { setModal(false) }} >
                                <IconButtonModal name='times' />
                                <TextButton>
                                    Fechar
                                </TextButton>
                            </ButtonComponent>


                            <ButtonComponent width="160px" color={theme.COLORS.PRIMARY_GREEN} onPress={() => { navigation.navigate('NewScheduling', { paramKey: dateSelected }); setModal(false) }} >
                                <IconButtonModal name='plus' colorText={theme.COLORS.BACKGROUND} />
                                <TextButton colorText={theme.COLORS.BACKGROUND}>
                                    Adicionar Passeio
                                </TextButton>
                            </ButtonComponent>



                        </ContentButtonsModal>
                    </ContentModal>
                </OutModal>
            </Modal>
        </Container>
    )
}