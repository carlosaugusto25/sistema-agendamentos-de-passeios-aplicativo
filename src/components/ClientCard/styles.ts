import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: ${RFValue(55)}px;
    background-color: ${({ theme }) => theme.COLORS.INPUT};
    border: 1px solid ${({ theme }) => theme.COLORS.INPUT_BORDER};
    border-radius: 5px;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    margin: ${RFValue(5)}px 0;
`;

export const IdScheduling = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.INTER_BOLD};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    margin-right: ${RFValue(15)}px;
`;

export const Content = styled.View`
    width: 83%;
`;

export const ContentAndTime = styled.View``;

export const NameUser = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
`;

export const TimeScheduling = styled.Text`
    color: ${({ theme }) => theme.COLORS.SUBTITLE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.INTER_REGULAR};
    font-size: ${RFValue(12)}px;
`;

export const IconEye = styled(FontAwesome5)`
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(20)}px;
`;
