import theme from "../../theme";
import { 
    Container,
    Input,
    IconInput,
    Icon
 } from "./styles";
import { TextInputMaskProps } from "react-native-masked-text";

 interface InputAndIconProps extends TextInputMaskProps {
    nameIcon?: string;
    icon?: boolean;
    marginTop?: number;
    marginBotton?: number;
    sizeIcon?: number;
    placeHolder?: string;
    inputMode?:'text' | 'none' | 'url' | 'email' | 'numeric' | 'tel' | 'search' ;
    password?: boolean;
 }

export function InputAndIconBlueMask({ nameIcon, icon, marginTop, marginBotton, sizeIcon, placeHolder, inputMode, password, ...rest }: InputAndIconProps) {
    return (
        <Container marginTop={marginTop} marginBotton={marginBotton} >
            {
                (icon && nameIcon) && 
                    <IconInput >
                        <Icon name={nameIcon} sizeIcon={sizeIcon} />
                    </IconInput>
            }
            <Input 
                cursorColor={theme.COLORS.PRIMARY_BLUE} 
                placeholder={placeHolder} 
                placeholderTextColor={theme.COLORS.TEXT_VERSION} 
                {...rest}
            />
        </Container>
    )
}