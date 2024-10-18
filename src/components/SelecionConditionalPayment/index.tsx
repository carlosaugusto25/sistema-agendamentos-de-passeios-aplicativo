import { useCallback, useEffect, useState } from "react";
import { 
    Container,
    ContentIcon,
    Icon,
    Content,
    NameBoat,
    IconSelection,
    ContentModal,
    ViewModal,
    ContentClose,
    CloseButton,
    ViewButton,
    TitleModal,
    NameBoatSelect,
    TextBoatSelect,
 } from "./styles";
import { GetBoatProps, GetBoatSelection } from "../../@types/interfaces/types";
import { api } from "../../service/api";
import { Modal } from "react-native";
import { ButtonModal } from "../ButtonModal";
import theme from "../../theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface SelectionConditionalPaymentProps extends TouchableOpacityProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    conditionalPaymentSelected: 'PIX' | 'MONEY' | 'CREDCARD' | undefined;
    setConditionalPaymentSelected: (val: 'PIX' | 'MONEY' | 'CREDCARD' | undefined) => void;
}

export function SelectionCondionalPayment({ open, setOpen, conditionalPaymentSelected, setConditionalPaymentSelected, ...rest }: SelectionConditionalPaymentProps) {
    return(
        <Container {...rest}>
            <ContentIcon>
                <Icon name='money-check-dollar'/>
            </ContentIcon>
            <Content>
                <NameBoat>{conditionalPaymentSelected === 'CREDCARD' ? 'Cartão de Credito' : (conditionalPaymentSelected === 'MONEY' ? 'Dinheiro' : (conditionalPaymentSelected === 'PIX' ? 'Pix' : 'Forma de pagamento'))}</NameBoat>
                <IconSelection name='caret-down' />
            </Content>

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
                        <TitleModal>Selecione a forma de pagamento</TitleModal>
                        
                                <NameBoatSelect onPress={() => { setConditionalPaymentSelected('CREDCARD');setOpen(false) }}>
                                    <TextBoatSelect>Cartão de crédito</TextBoatSelect>
                                </NameBoatSelect>
                                <NameBoatSelect onPress={() => { setConditionalPaymentSelected('MONEY');setOpen(false) }}>
                                    <TextBoatSelect>Dinheiro</TextBoatSelect>
                                </NameBoatSelect>
                                <NameBoatSelect onPress={() => { setConditionalPaymentSelected('PIX');setOpen(false) }}>
                                    <TextBoatSelect>Pix</TextBoatSelect>
                                </NameBoatSelect>
                        
                    </ViewModal>
                </ContentModal>
            </Modal>
        </Container>
    )
}