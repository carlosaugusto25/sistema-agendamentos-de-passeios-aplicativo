import { TouchableOpacityProps } from "react-native";
import { Container, TextButton } from "./styles";

interface ButtonModalProps extends TouchableOpacityProps {
    colorButton: string;
    width: string;
    text: string;
    border?: boolean;
    colorText: string;
}

export function ButtonModal({colorButton, width, text, border, colorText, ...rest}: ButtonModalProps) {
    return(
        <Container colorButton={colorButton} widthButton={width} border={border} {...rest}>
            <TextButton colorText={colorText}>{text}</TextButton>
        </Container>
    )
}