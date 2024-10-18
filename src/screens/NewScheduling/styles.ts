import styled from "styled-components/native";
import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { css } from "styled-components";

interface PropsCheckBox {
    color?: string;
}

interface IconProps {
    width?: number;
    fontSize?: number;
    color?: string;
}

interface CheckAndOptionsProps {
    marginTop?:number;
    marginBotton?:number;
}

interface ButtonProps {
    borderRight?: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    padding: ${RFValue(40)}px ${RFValue(20)}px 0;
`;

export const HeaderScreen = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonBack = styled.TouchableOpacity`
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
    align-items: flex-start;
    justify-content: center;
`;

export const IconBack = styled(FontAwesome)`
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(24)}px;
`;

export const TitleScreen = styled.Text`
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    font-size: ${RFValue(20)}px;
`;

export const ViewComplementation = styled.View`
    background-color: transparent;
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
`;

export const Content = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    padding: ${RFValue(10)}px 0 ${RFValue(100)}px;
`;

export const CheckAndOption = styled.View<CheckAndOptionsProps>`
    flex-direction: row;
    margin-top: ${({marginTop}) => marginTop ? RFValue(marginTop) : RFValue(10)}px;
    margin-bottom: ${({marginBotton}) => marginBotton ? RFValue(marginBotton) : RFValue(10)}px;
    align-items: center;
`;

export const CheckBox = styled.TouchableOpacity<PropsCheckBox>`
    width: ${RFValue(25)}px;
    height: ${RFValue(25)}px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${({color})=>color?color:'transparent'};
`;

export const IconCheck = styled(FontAwesome)<IconProps>`
    font-size: ${({fontSize}) => fontSize ? RFValue(fontSize) : RFValue(22)}px;
    width: ${({width}) => width ? RFValue(width) : RFValue(22)}px;
    color: ${({color, theme})=> color ? color : theme.COLORS.PRIMARY_BLUE};
`;

export const TextOption = styled.Text`
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_REGULAR};
    font-size: ${RFValue(14)}px;
    margin-left: ${RFValue(10)}px;
`;

export const ButtonsOptions = styled.View`
    width: 100%;
    height: ${RFValue(65)}px;
    border-top-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
    border-top-width: 1px;
    flex-direction: row;
`;

export const ButtonAction = styled.TouchableOpacity<ButtonProps>`
    width: 50%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    ${({ theme, borderRight }) => borderRight && css`
        border-right-color: ${theme.COLORS.INPUT_BORDER}; 
        border-right-width: 1px;`
    }
`;

export const TextCancel = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.INTER_REGULAR};
    color: ${({ theme }) => theme.COLORS.SUBTITLE};
    font-size: ${RFValue(15)}px;
`;

export const TextConfirm = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.INTER_REGULAR};
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(15)}px;
`;