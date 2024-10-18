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
import { GetBoatProps, GetBoatPropsSelection, GetBoatSelection } from "../../@types/interfaces/types";
import { api } from "../../service/api";
import { Modal } from "react-native";
import { ButtonModal } from "../ButtonModal";
import theme from "../../theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface SelectionBoatProps extends TouchableOpacityProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setYearSelected: (val: number) => void;
    yearSelected?: number;
}

export function SelectionYear({ open, setOpen, setYearSelected, yearSelected, ...rest }: SelectionBoatProps) {

    const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030']
    
    return(
        <Container {...rest}>
            <ContentIcon>
                <Icon name='calendar'/>
            </ContentIcon>
            <Content>
                <NameBoat>{yearSelected ? yearSelected : years[0]}</NameBoat>
                <IconSelection name='caret-down' />
            </Content>

            <Modal
                statusBarTranslucent
                animationType="slide"
                transparent
                visible={open}
                onRequestClose={() => { setOpen(false) }}
            >
                <ContentModal onPress={() => { setOpen(false) }}>
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
                        <TitleModal>Selecione o ano</TitleModal>
                        {
                            years?.map((year, index) => (
                                <NameBoatSelect key={index} onPress={() => {  setYearSelected(Number(year));setOpen(false) }}>
                                    <TextBoatSelect>{year}</TextBoatSelect>
                                </NameBoatSelect>
                            ))
                        }
                    </ViewModal>
                </ContentModal>
            </Modal>
        </Container>
    )
}