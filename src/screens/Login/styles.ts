import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const BackgroundImageTop = styled.ImageBackground`
    width: 100%;
    height: 350px;
`;

export const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: ${RFValue(30)}px ;
`;

export const LogoImage = styled.Image``;

export const LogoYazon = styled.Image``;

export const Version = styled.Text`
    color: ${({ theme }) => theme.COLORS.TEXT_VERSION};
    font-family: ${({ theme }) => theme.FONT_FAMILY.INTER_REGULAR};
`;

export const ContentLogin = styled.View`
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: ${RFValue(30)}px;
`;

export const ContentBotton = styled.View`
    align-items: center;
    margin-top: ${RFValue(50)}px;
`;
