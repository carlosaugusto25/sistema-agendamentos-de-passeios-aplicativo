import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.View`
    padding: ${RFValue(5)}px ${RFValue(20)}px ${RFValue(20)}px;
    flex: 1;
`;

export const Traco = styled.View`
    background-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
    width: 100%;
    height: 1px;
    margin: ${RFValue(10)}px 0;
`;

export const Traco2 = styled.View`
    background-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
    width: 100%;
    height: 1px;
    margin: ${RFValue(10)}px 0 0 0;
`;

export const DateScheduling = styled.Text`
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    font-size: ${RFValue(16)}px;
    margin: ${RFValue(10)}px 0;
`;