import { ActivityIndicator, View } from "react-native";
import theme from "../../theme";
import Lottie from 'lottie-react-native';

export function Loading(){
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {/* <ActivityIndicator size={35} color={theme.COLORS.PRIMARY_BLUE} /> */}
            <Lottie source={require('../../assets/boat.json')} style={{width: 100, height: 100}} autoPlay loop />
        </View>
    )
}