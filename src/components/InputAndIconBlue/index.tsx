import { TextInputProps } from "react-native";
import theme from "../../theme";
import { 
    Container,
    Input,
    IconInput,
    Icon
 } from "./styles";

 interface InputAndIconProps extends TextInputProps {
    nameIcon?: string;
    icon?: boolean;
    marginTop?: number;
    marginBotton?: number;
    sizeIcon?: number;
    placeHolder?: string;
    inputMode?:'text' | 'none' | 'url' | 'email' | 'numeric' | 'tel' | 'search' ;
    password?: boolean;
 }

export function InputAndIconBlue({ nameIcon, icon, marginTop, marginBotton, sizeIcon, placeHolder, inputMode, password, ...rest }: InputAndIconProps) {
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