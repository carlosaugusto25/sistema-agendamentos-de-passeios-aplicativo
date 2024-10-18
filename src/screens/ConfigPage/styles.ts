import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
`;

export const Content = styled.View`
    flex: 1;
    padding: ${RFValue(10)}px;
    gap: ${RFValue(10)}px;
`;

export const Card = styled.View`
    padding: ${RFValue(20)}px ${RFValue(10)}px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
    border-radius: 8px;
    /* border: 1px solid ${({ theme }) => theme.COLORS.INPUT_BORDER}; */
    border-bottom-width: 8px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.TERCIARY_BLUE};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${RFValue(10)}px;
`;

export const Label = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    font-size: ${RFValue(16)}px;
`;

export const Info = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(20)}px;
`;

