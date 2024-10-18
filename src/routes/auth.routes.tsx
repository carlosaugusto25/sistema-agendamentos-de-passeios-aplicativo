import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";
import { AppRoutes } from "./app.routes";

const Auth = createStackNavigator();

export function AuthRoutes(){
    return(
        <Auth.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Auth.Screen name="Login" component={Login} />
            <Auth.Screen name="IinicioApp" component={AppRoutes} />
        </Auth.Navigator>
    )
}