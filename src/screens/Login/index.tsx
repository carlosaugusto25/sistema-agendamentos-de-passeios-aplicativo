import { ButtonComponent } from "../../components/ButtonComponent";
import { InputAndIcon } from "../../components/InputAndIcon";
import {
    Container,
    BackgroundImageTop,
    Content,
    LogoImage,
    LogoYazon,
    Version,
    ContentLogin,
    ContentBotton
} from "./styles";
import imageBackground from "../../assets/background-turtle.png";
import logoWendel from "../../assets/logo-wendell.png";
import logoYazon from "../../assets/logo-yazon.png";
import { ScrollView } from "react-native";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export function Login() {

    const {login, loading} = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container behavior={"padding"} enabled keyboardVerticalOffset={20}>
            <StatusBar translucent style="dark" />
            <ScrollView>
                <BackgroundImageTop source={imageBackground} resizeMode="cover" />
                <Content>
                    <LogoImage source={logoWendel} />
                    <ContentLogin>
                        <InputAndIcon autoCapitalize="none" value={email} onChangeText={(e)=>setEmail(e)} icon nameIcon="envelope" placeHolder="E-mail" marginBotton={10} />
                        <InputAndIcon eye width={180} setEye={setShowPassword} autoCapitalize="none" value={password} onChangeText={setPassword} icon nameIcon="lock" placeHolder="Senha" sizeIcon={25} password={showPassword} />
                        <ButtonComponent textOnly loading={loading} text={"ENTRAR"} onPress={() => login({email, password})} />
                    </ContentLogin>
                    <ContentBotton>
                        <LogoYazon source={logoYazon} />
                        <Version>v1.0.0</Version>
                    </ContentBotton>
                </Content>
            </ScrollView>
        </Container>
    );
}