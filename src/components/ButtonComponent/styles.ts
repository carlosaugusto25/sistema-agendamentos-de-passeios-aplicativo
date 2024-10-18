import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps {
    marginTop?:number;
    marginBotton?:number;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    width: 100%;
    height: ${RFValue(50)}px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    align-items: center;
    justify-content: center;
    margin-top: ${({ marginTop }) => marginTop ? RFValue(marginTop) : RFValue(10)}px;
    margin-bottom: ${({ marginBotton }) => marginBotton ? RFValue(marginBotton) : RFValue(10)}px;
    flex-direction: row;
`;

export const TextButton = styled.Text`
    color: ${({ theme }) => theme.COLORS.BACKGROUND};
    font-family: ${({ theme }) => theme.FONT_FAMILY.INTER_BOLD};
    font-size: ${RFValue(18)}px;
`;


