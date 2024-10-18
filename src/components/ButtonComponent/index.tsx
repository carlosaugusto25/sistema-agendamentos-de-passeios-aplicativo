import { ActivityIndicator, Touchable, TouchableOpacityProps } from "react-native";
import { Container, TextButton } from "./styles";
import { FontAwesome5 } from '@expo/vector-icons';

interface ButtonProps extends TouchableOpacityProps {
    text?: string;
    marginTop?: number;
    marginBotton?: number;
    loading?: boolean;
    icon?: boolean;
    textOnly?: boolean;
    nameIcon?: string;
    iconAndText?: boolean;
}

export function ButtonComponent({ text, marginTop, marginBotton, loading, textOnly, icon, nameIcon, iconAndText, ...rest }: ButtonProps) {
    return (
        <Container marginBotton={marginBotton} marginTop={marginTop} {...rest} >
            {
                loading ?
                    <ActivityIndicator color={'#fff'} size={30} />
                    :
                    <>
                        {
                            icon &&
                            <FontAwesome5 name={nameIcon} size={25} color="#fff" />
                        }
                        {
                            textOnly &&
                            <TextButton>{text}</TextButton>
                        }
                        {
                            iconAndText &&
                            <>
                                <TextButton style={{ marginRight: 10 }}>{text}</TextButton>
                                <FontAwesome5 name={nameIcon} size={25} color="#fff" />
                            </>
                        }
                    </>
            }
        </Container>
    )
}