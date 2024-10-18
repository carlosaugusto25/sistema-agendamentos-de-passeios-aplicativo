import styled from "styled-components/native";
import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface InputAndIconProps {
    marginTop?:number;
    marginBotton?:number;
}

interface IconProps {
    sizeIcon?:number;
}

interface InputProps {
    width?:number;
}

export const Container = styled.View<InputAndIconProps>`
    width: 100%;
    height: ${RFValue(50)}px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.INPUT};
    border: 1px solid ${({ theme }) => theme.COLORS.INPUT_BORDER};
    border-radius: 5px;
    margin-top: ${({ marginTop }) => marginTop ? RFValue(marginTop) : RFValue(10)}px;
    margin-bottom: ${({ marginBotton }) => marginBotton ? RFValue(marginBotton) : RFValue(10)}px;
`;

export const IconInput = styled.View`
    border-right-width: 1px;
    border-right-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
    height: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled(FontAwesome)<IconProps>`
    font-size: ${({ sizeIcon })=> sizeIcon ? RFValue(sizeIcon) : RFValue(20)}px;
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
`;

export const Input = styled.TextInput<InputProps>`
    width: ${({ width }) => width ? RFValue(width) : RFValue(230)}px;
    padding: 16px;
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_REGULAR};
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
`;
