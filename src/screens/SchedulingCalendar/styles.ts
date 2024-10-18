import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

interface TypeDayProps {
    width: number;
}

interface ButtonComponentProps {
    color?: string;
    width?: string;
}

interface ButtonTextProps {
    colorText?: string;
}

interface CardEventProps {
    color?: string;
}

interface ColorBoatsProps {
    color: string;
}

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const BoxCalendar = styled.View`
    flex: 1;
    padding: ${RFValue(10)}px;
    width: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const OutModal = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.2);
`;

export const ContentModal = styled.View`
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    border-radius: ${RFValue(5)}px;
    padding: ${RFValue(10)}px;
    width: ${RFValue(300)}px;
    align-items: center;
    max-height: ${RFValue(500)}px;
`;

export const HeaderModal = styled.ImageBackground`
    width: ${RFValue(280)}px;
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(5)}px;
`;

export const ContentHeader = styled.View`
    
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const DateDay = styled.Text`
    color: ${({theme}) => theme.COLORS.BACKGROUND};
    font-family: ${({theme}) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    font-size: ${RFValue(20)}px;
`;

export const NameDay = styled.Text`
    color: ${({theme}) => theme.COLORS.BACKGROUND};
    font-family: ${({theme}) => theme.FONT_FAMILY.INTER_BOLD};
    font-size: ${RFValue(16)}px;
`;

export const Traco = styled.View`
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
    width: 100%;
    height: 1px;
`;

export const ContentButtonsModal = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 0 ${RFValue(70)}px;
`;

export const ButtonComponent = styled.TouchableOpacity<ButtonComponentProps>`
    background-color: ${({theme, color}) => color ? color : theme.COLORS.PRIMARY_BLUE};
    padding: ${RFValue(10)}px;
    border-radius: ${RFValue(5)}px;
    margin-top: ${RFValue(20)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${RFValue(3)}px;
    width: ${({width}) => width ? width : ''};
`;

export const TextButton = styled.Text<ButtonTextProps>`
    color: ${({theme, colorText}) => colorText ? colorText : theme.COLORS.PRIMARY_BLUE};
    font-family: ${({theme}) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    text-align: center;
`;

export const IconButtonModal = styled(FontAwesome5)<ButtonTextProps>`
    font-size: ${RFValue(12)}px;
    color: ${({theme, colorText}) => colorText ? colorText : theme.COLORS.PRIMARY_BLUE};
`;

export const ContentList = styled.ScrollView`
    margin-top: ${RFValue(20)}px;
    gap: ${RFValue(10)}px;
    width: 100%;
`;

export const CardEvent = styled.TouchableOpacity<CardEventProps>`
    box-shadow: 0px 0px 10px rgba(100,100,150,.1);
    background-color: ${({theme})=>theme.COLORS.INPUT};
    padding: ${RFValue(5)}px;
    border-left-color: ${({theme, color}) => color ? color : theme.COLORS.PRIMARY_BLUE};
    border-left-width: ${RFValue(4)}px;
    border-right-color: ${({theme, color}) => color ? color : theme.COLORS.PRIMARY_BLUE};
    border-right-width: ${RFValue(4)}px;
    border-bottom-width: ${RFValue(4)}px;
    border-bottom-color: ${({theme, color}) => color ? color : theme.COLORS.PRIMARY_BLUE};
    border-top-left-radius:${RFValue(8)}px;
    border-bottom-left-radius: ${RFValue(8)}px;
    border-top-right-radius: ${RFValue(8)}px;
    border-bottom-right-radius: ${RFValue(8)}px;
    margin-bottom: ${RFValue(10)}px;
    width: 100%;
    height: ${RFValue(40)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TitleEvent = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    color: ${({theme}) => theme.COLORS.PRIMARY_BLUE};
    margin-left: ${RFValue(5)}px;
    font-size: ${RFValue(13)}px;
`;

export const DateEvent = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.LEXEND_REGULAR};
    color: ${({theme}) => theme.COLORS.PRIMARY_BLUE};
    margin-left: ${RFValue(5)}px;
    font-size: ${RFValue(10)}px;
`;

export const BoatEvent = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.LEXEND_BOLD};
    color: ${({theme}) => theme.COLORS.PRIMARY_BLUE};
    margin-left: ${RFValue(5)}px;
    font-size: ${RFValue(10)}px;
`;

export const TextNoEvent = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.LEXEND_REGULAR};
    color: ${({theme}) => theme.COLORS.PRIMARY_BLUE};
    margin-left: ${RFValue(5)}px;
`;

export const Icons = styled(FontAwesome5)`
    color: ${({theme}) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(15)}px;
`;

export const LegendBoat = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${RFValue(20)}px;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const NameAndColor = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${RFValue(5)}px;
`;

export const NameBoat = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.LEXEND_REGULAR};
    color: ${({theme}) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(12)}px;
`;

export const ColorBoat = styled.View<ColorBoatsProps>`
    width: ${RFValue(45)}px;
    height: ${RFValue(15)}px;
    border-radius: ${RFValue(5)}px;
    background-color: ${({color}) => color};
`;