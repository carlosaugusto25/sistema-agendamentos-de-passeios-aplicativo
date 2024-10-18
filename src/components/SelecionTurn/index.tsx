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

interface SelectionTurnProps extends TouchableOpacityProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    turn: 'MORNING' | 'AFTERNOON' | 'DAY' | undefined;
    setTurn: (val: 'MORNING' | 'AFTERNOON' | 'DAY' | undefined) => void;
}

export function SelectionTurn({ open, setOpen, turn, setTurn, ...rest }: SelectionTurnProps) {
      
    
    return(
        <Container {...rest}>
            <ContentIcon>
                <Icon name='cloud-sun'/>
            </ContentIcon>
            <Content>
                <NameBoat>{turn === 'MORNING' ? 'Manhã' : (turn === 'AFTERNOON' ? 'Tarde' : (turn === 'DAY' ? 'Dia inteiro' : 'Selecione o turno'))}</NameBoat>
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
                        <TitleModal>Selecione o turno do passeio</TitleModal>
                        
                                <NameBoatSelect onPress={() => { setTurn('MORNING');setOpen(false) }}>
                                    <TextBoatSelect>Manhã</TextBoatSelect>
                                </NameBoatSelect>
                                <NameBoatSelect onPress={() => { setTurn('AFTERNOON');setOpen(false) }}>
                                    <TextBoatSelect>Tarde</TextBoatSelect>
                                </NameBoatSelect>
                                <NameBoatSelect onPress={() => { setTurn('DAY');setOpen(false) }}>
                                    <TextBoatSelect>Dia inteiro</TextBoatSelect>
                                </NameBoatSelect>
                        
                    </ViewModal>
                </ContentModal>
            </Modal>
        </Container>
    )
}