import { TouchableOpacityProps } from "react-native";
import { 
    Container,
    IdScheduling,
    Content,
    ContentAndTime,
    NameUser,
    TimeScheduling,
    IconEye,
 } from "./styles";

interface ClientCardProps extends TouchableOpacityProps {
    id: string;
    name: string;
    time: string;
}

export function ClientCard({id, name, time, ...rest}: ClientCardProps){
    return(
        <Container {...rest}>
            <IdScheduling>{id}</IdScheduling>
            <Content>
                <ContentAndTime>
                    <NameUser numberOfLines={1}>{name}</NameUser>
                    <TimeScheduling>{time}</TimeScheduling>
                </ContentAndTime>
            </Content>
            <IconEye name="eye" />
        </Container>
    )
}