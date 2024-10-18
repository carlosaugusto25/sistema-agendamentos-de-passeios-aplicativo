import {
    Container,
    BackgroundHeader,
    NameScreen,
    NameUser,
    Name,
    ContentNameScreen,
    ViewLeft,
    ViewRight,
    ButtonIcon,
} from "./styles";
import bg from '../../assets/top-header.png';
import { useAuth } from "../../context/auth";
import { FontAwesome5 } from '@expo/vector-icons'

interface HeaderProps {
    nameScreen: string;
    leftIcon?: boolean;
    rigthIcon?: boolean;
    leftNameIcon?: string;
    rightNameIcon?: string;
    onPressLeft?: () => void;
    onPressRight?: () => void;
}

export function Header({ nameScreen, leftIcon, rigthIcon, leftNameIcon, rightNameIcon, onPressLeft, onPressRight }: HeaderProps) {
    
    const {user} = useAuth();
    
    return (
        <BackgroundHeader source={bg}>
            <NameUser>Olá, <Name>{user.name}</Name></NameUser>
            <ContentNameScreen>
            <ViewLeft>
                {
                    leftIcon && (
                        <ButtonIcon onPress={onPressLeft}><FontAwesome5 name={leftNameIcon} size={30} color="white" /></ButtonIcon>
                    )
                }
            </ViewLeft>
            <NameScreen>{nameScreen}</NameScreen>
            <ViewRight>
                {
                    rigthIcon && (
                        <ButtonIcon onPress={onPressRight}><FontAwesome5 name={rightNameIcon} size={30} color="white" /></ButtonIcon>
                    )
                }
            </ViewRight>
            </ContentNameScreen>
        </BackgroundHeader>
    )
}