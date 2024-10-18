import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.ScrollView`
    flex: 1;
    padding: ${RFValue(20)}px ${RFValue(20)}px ${RFValue(20)}px;
`;

export const ContentButtons = styled.View`
    width: 100%;
    padding: ${RFValue(10)}px ${RFValue(20)}px ${RFValue(10)}px;
    flex-direction: row;
    gap: ${RFValue(10)}px;
`;

export const CardInfo = styled.View`
    padding: ${RFValue(10)}px;
    background-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
    border-radius: 8px;
    margin-bottom: ${RFValue(10)}px;
`;

export const NameClient = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_BOLD};
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(18)}px;
`;

export const Label = styled.Text`
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
`;

export const Info = styled.Text`
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_BOLD};
    font-size: ${RFValue(16)}px;
`;

export const Line = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const LabelAndInfo = styled.View`

`;

export const TextModalDelete = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(20)}px;
`;

export const ContentButtonsModalDelete = styled.View`
    flex-direction: row;
    gap: ${RFValue(10)}px;
    margin-top: ${RFValue(20)}px;
`;

export const ContentModalEdit = styled.ScrollView`
    flex: 1;
`;

export const ContentButtonsModalEdit = styled.View`
    flex-direction: row;
    gap: ${RFValue(10)}px;
`;