import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`

`;

export const BackgroundHeader = styled.ImageBackground`
    width: 100%;
    height: 160px;
    /* background-color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE}; */
    /* background-color: radial-gradient(58.93% 69.94% at 50% 100%, #264A8C 0%, #0099DD 100%); */

`;

export const ContentNameScreen = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${RFValue(20)}px;
    margin-top: ${RFValue(15)}px;
`;

export const ViewLeft = styled.View`
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
`;

export const ViewRight = styled.View`
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
`;

export const ButtonIcon = styled.TouchableOpacity`
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
    align-items: center;
    justify-content: center;
`;

export const NameScreen = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    font-size: ${({ theme }) => RFValue(theme.FONT_SIZE.XL)}px;
    color: ${({ theme }) => theme.COLORS.BACKGROUND};
    text-align: center;
`;

export const NameUser = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_REGULAR};
    font-size: ${({ theme }) => RFValue(theme.FONT_SIZE.XL)}px;
    color: ${({ theme }) => theme.COLORS.BACKGROUND};
    margin-top: ${RFValue(30)}px;
    margin-left: ${RFValue(20)}px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_BOLD};
`;
