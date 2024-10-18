import { ReactNode, useCallback, useEffect, useState } from "react";
import { 
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

import { Modal } from "react-native";


interface SelectionBoatProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: ReactNode;
    titleModal?: string;
    height?: number;
}

export function Selection({ open, setOpen, children, titleModal, height }: SelectionBoatProps) {
    
    
    return(
            <Modal
                statusBarTranslucent
                animationType="slide"
                transparent
                visible={open}
                onRequestClose={() => { setOpen(false) }}
            >
                <ContentModal >
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
                        height={height}
                    >
                        <ContentClose>
                            <CloseButton onPress={() => { setOpen(false) }}>
                                <ViewButton />
                            </CloseButton>
                        </ContentClose>
                        <TitleModal>{titleModal}</TitleModal>
                        {
                            children
                        }
                    </ViewModal>
                </ContentModal>
            </Modal>
    )
}