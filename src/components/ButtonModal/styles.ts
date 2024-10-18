import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface ButtonModalProps {
    colorButton: string;
    widthButton: string;
    border?: boolean;
}

interface TextButtonProps {
    colorText: string;
}

export const Container = styled.TouchableOpacity<ButtonModalProps>`
    background-color: ${({ colorButton }) => colorButton};
    width: ${({ widthButton }) => widthButton};
    ${({ border }) => border && css`
        border: 1px solid ${({ theme }) => theme.COLORS.INPUT_BORDER};
    `}
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    height: ${RFValue(55)}px;
`;

export const TextButton = styled.Text<TextButtonProps>`
    color: ${({ colorText }) => colorText};
    font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_REGULAR};
    font-size: ${RFValue(15)}px;
`;