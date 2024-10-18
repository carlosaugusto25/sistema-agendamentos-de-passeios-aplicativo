import { CloseButton, ContentButtons, ContentClose, ContentModal, Info, LabelInfo, Scroll, TitleModal, ViewButton, ViewModal } from "./styles";
import { Modal } from "react-native";
import { ButtonModal } from "../ButtonModal";
import theme from "../../theme";
import { AdditionalProps, GetBoatProps, GetBoatPropsSelection } from "../../@types/interfaces/types";
import { addDays, format } from "date-fns";
import { maskCpf, maskPhone } from "../../utils/masks";

interface ModalConfirmationProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    boat: GetBoatPropsSelection;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    value: string;
    totalValue: number;
    turn: 'MORNING' | 'AFTERNOON' | 'DAY' | undefined;
    payment: 'PIX' | 'MONEY' | 'CREDCARD' | undefined;
    passengers: string;
    paid: string;
    date: string;
    aditionals: AdditionalProps[];
    aditionalSelected: string[];
    onPress: () => void;
}

export function ModalConfirmation({ open, setOpen, boat, name, cpf, value, passengers, paid, date, aditionals, aditionalSelected, onPress, email, phone, totalValue, turn, payment }: ModalConfirmationProps) {

    return (

        <Modal
            statusBarTranslucent
            animationType="slide"
            transparent
            visible={open}
            onRequestClose={() => { setOpen(false) }}
        >
            <ContentModal>
                <ViewModal
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <ContentClose>
                        <CloseButton onPress={() => { setOpen(false) }}>
                            <ViewButton />
                        </CloseButton>
                    </ContentClose>
                    <TitleModal>Deseja confirmar a reserva e gerar o voucher?</TitleModal>
                    <Scroll>
                        <LabelInfo>Embarcação:</LabelInfo>
                        <Info>{boat ? boat.name : 'Não informado'}</Info>
                        <LabelInfo>Nome:</LabelInfo>
                        <Info>{name ? name : 'Não informado'}</Info>
                        <LabelInfo>CPF:</LabelInfo>
                        <Info>{cpf ? maskCpf(cpf) : 'Não informado'}</Info>
                        <LabelInfo>E-mail:</LabelInfo>
                        <Info>{email ? email : 'Não informado'}</Info>
                        <LabelInfo>Contato:</LabelInfo>
                        <Info>{phone ? maskPhone(phone) : 'Não informado'}</Info>
                        <LabelInfo>Turno:</LabelInfo>
                        <Info>{turn === 'MORNING' ? 'Manhã' : (turn === 'AFTERNOON' ? 'Tarde' : (turn === 'DAY' ? 'Dia inteiro' : 'Não informado'))}</Info>
                        <LabelInfo>Valor:</LabelInfo>
                        <Info>{value ? new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(value)) : 'Não informado'}</Info>
                        <LabelInfo>Condição de pagamento:</LabelInfo>
                        <Info>{payment === 'PIX' ? 'Pix' : (payment === 'MONEY' ? 'Dinheiro' : (payment === 'CREDCARD' ? 'Cartão de Credito' : 'Não informado'))}</Info>
                        <LabelInfo>Quantidade:</LabelInfo>
                        <Info>{passengers ? passengers : 'Não informado'}</Info>
                        <LabelInfo>Valor pago na reserva:</LabelInfo>
                        <Info>{paid ? new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(paid)) : 'Não informado'}</Info>
                        <LabelInfo>Data:</LabelInfo>
                        <Info>{date ? format(addDays(new Date(date), 1), 'dd/MM/yyyy') : 'Não informado'}</Info>
                        <LabelInfo>Adicionais:</LabelInfo>
                        {
                            aditionals.map((item) => {
                                if (aditionalSelected.includes(item.id)) {
                                    return (
                                        <Info>{item.name}</Info>
                                    )
                                }
                            })
                        }
                        <LabelInfo>Valor Total:</LabelInfo>
                        <Info>{totalValue ? new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(totalValue / 100) : 'Não informado'}</Info>
                    </Scroll>
                    <ContentButtons>
                        <ButtonModal onPress={() => { setOpen(false) }} colorButton={theme.COLORS.INPUT} text="Ainda não" colorText={theme.COLORS.SUBTITLE} border width={"47%"} />
                        <ButtonModal onPress={onPress} colorButton={theme.COLORS.PRIMARY_BLUE} text="Confirmar" colorText={theme.COLORS.BACKGROUND} width={"47%"} />
                    </ContentButtons>
                </ViewModal>
            </ContentModal>
        </Modal>

    )
}