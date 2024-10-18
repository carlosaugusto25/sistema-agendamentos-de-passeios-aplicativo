import { TextInputProps, TouchableOpacity } from "react-native";
import theme from "../../theme";
import { 
    Container,
    Input,
    IconInput,
    Icon
 } from "./styles";
 import { FontAwesome5 } from '@expo/vector-icons';

 interface InputAndIconProps extends TextInputProps {
    nameIcon?: string;
    icon?: boolean;
    marginTop?: number;
    marginBotton?: number;
    sizeIcon?: number;
    placeHolder?: string;
    inputMode?:'text' | 'none' | 'url' | 'email' | 'numeric' | 'tel' | 'search' ;
    password?: boolean;
    eye?: boolean;
    setEye?: (eye: boolean) => void;
    width?: number;
 }

export function InputAndIcon({ nameIcon, width, icon, marginTop, setEye, eye, marginBotton, sizeIcon, placeHolder, inputMode, password, ...rest }: InputAndIconProps) {
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
                placeholderTextColor={theme.COLORS.INPUT_BORDER} 
                inputMode={inputMode ? inputMode : 'text'}
                secureTextEntry={password}
                width={width}
                {...rest}
            />
            {
                eye &&
                <TouchableOpacity onPress={() => setEye!(!password)} style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <FontAwesome5 name={password ? 'eye-slash' : 'eye'} size={25} color={theme.COLORS.PRIMARY_BLUE} />
                </TouchableOpacity>
            }
        </Container>
    )
}