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
import { Modal, ScrollView } from "react-native";
import { ButtonModal } from "../ButtonModal";
import theme from "../../theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";



interface SelectionBoatProps extends TouchableOpacityProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setMonthSelected: (val: number) => void;
    monthSelected?: number;
}

export function SelectionMonth({ open, setOpen, setMonthSelected, monthSelected, ...rest }: SelectionBoatProps) {

    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

    return (
        <Container {...rest}>
            <ContentIcon>
                <Icon name='calendar-week' />
            </ContentIcon>
            <Content>
                <NameBoat>{months[monthSelected ? monthSelected : 0]}</NameBoat>
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
                        <TitleModal>Selecione o mês</TitleModal>
                        <ScrollView>
                            {
                                months?.map((month, index) => (
                                    <NameBoatSelect key={index} onPress={() => { setMonthSelected(index); setOpen(false) }}>
                                        <TextBoatSelect>{month}</TextBoatSelect>
                                    </NameBoatSelect>
                                ))
                            }
                        </ScrollView>
                    </ViewModal>
                </ContentModal>
            </Modal>
        </Container>
    )
}