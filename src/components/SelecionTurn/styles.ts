import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {FontAwesome, FontAwesome6} from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: ${RFValue(50)}px;
    background-color: ${({ theme }) => theme.COLORS.INPUT};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    flex-direction: row;
    align-items: center;

`;

export const ContentIcon = styled.View`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    align-items: center;
    justify-content: center;
    border-right-width: 1px;
    border-right-color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
`;

export const Icon = styled(FontAwesome6)`
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(20)}px;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 82%;
    padding: 0 ${RFValue(10)}px;
`;

export const NameBoat = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_REGULAR};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
`;

export const IconSelection = styled(FontAwesome)`
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    font-size: ${RFValue(24)}px;
`;

export const ContentModal = styled.View`
    background-color: rgba(0,0,0,0.5);
    flex: 1;
    justify-content: flex-end;
`;

export const ViewModal = styled.View`
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    width: 100%;
    height: 350px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    padding: 16px;
    padding-top: ${RFValue(16)}px;
    padding-bottom: ${RFValue(8)}px;
`;

export const ContentClose = styled.View`
  width: 100%;
  align-items: center;
  height: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
    padding: ${RFValue(8)}px;
    margin-bottom: ${RFValue(16)}px;
`;

export const ViewButton = styled.View`
    width: ${RFValue(50)}px;
    height: ${RFValue(4)}px;
    border-radius: 2px;
    background: ${({ theme }) => theme.COLORS.INPUT_BORDER} ;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    width: '100%',
  }
})``;

export const TitleModal = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    text-align: center;
    margin: ${RFValue(10)}px 0 ${RFValue(15)}px;
`;

export const NameBoatSelect = styled.TouchableOpacity`
    width: 100%;
    height: ${RFValue(50)}px;
    background-color: ${({ theme }) => theme.COLORS.INPUT_BORDER};
    border-radius: 5px;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    margin: ${RFValue(5)}px 0;
`;

export const TextBoatSelect = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_REGULAR};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
`;



