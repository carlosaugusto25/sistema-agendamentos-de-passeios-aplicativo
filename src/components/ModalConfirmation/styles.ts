import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ContentModal = styled.View`
    background-color: rgba(0,0,0,0.5);
    flex: 1;
    justify-content: flex-end;
`;

export const ViewModal = styled.View`
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    width: 100%;
    height: 750px;
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
})`
  margin-top: ${RFValue(20)}px;
`;

export const TitleModal = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_SEMIBOLD};
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
    text-align: center;
    margin-top: ${RFValue(10)}px;
`;

export const ContentButtons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${RFValue(15)}px;
`;

export const LabelInfo = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_BOLD};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.COLORS.SECONDARY_BLUE};
`;

export const Info = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.LEXEND_BOLD};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.COLORS.PRIMARY_BLUE};
    margin-bottom: ${RFValue(8)}px;
`;