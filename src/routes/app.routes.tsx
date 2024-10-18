import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import { SchedulingList } from "../screens/SchedulingList";
import { FontAwesome5 } from "@expo/vector-icons";
import { NewScheduling } from "../screens/NewScheduling";
import { ConfigPage } from "../screens/ConfigPage";
import { SchedulingCalendar } from "../screens/SchedulingCalendar";
import { RFValue } from "react-native-responsive-fontsize";
import { SchedulingDetails } from "../screens/SchedulingDetails";

// teardrinker do mastodon
const Tab = createBottomTabNavigator();
const App = createStackNavigator()

export function RoutesHome(){
    const {COLORS} = useTheme()
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.BACKGROUND_TAB,
                    paddingVertical: RFValue(5),
                    height: RFValue(55),
                },
                tabBarLabelStyle:{
                    marginBottom: RFValue(5),
                },
                tabBarActiveTintColor: COLORS.SECONDARY_BLUE,
                tabBarInactiveTintColor: COLORS.SUBTITLE,
                tabBarIcon: ({color, size}) => {
                    let iconName
                    if (route.name === "Lista") {
                        iconName = "list"
                    } else if (route.name === "Calendário") {
                        iconName = "calendar"
                    } else if (route.name === "Configurações") {
                        iconName = "cog"
                    }
                    return <FontAwesome5 name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name="Lista" component={SchedulingList} />
            <Tab.Screen name="Calendário" component={SchedulingCalendar} />
            <Tab.Screen name="Configurações" component={ConfigPage} />
        </Tab.Navigator>
    )
}
export function AppRoutes() {
    return (
       <App.Navigator
            screenOptions={{
                headerShown: false
            }}
       >
        <App.Screen name="Home" component={RoutesHome} />
        <App.Screen name="SchedulingList" component={SchedulingList} />
        <App.Screen name="SchedulingCalendar" component={SchedulingCalendar} />
        <App.Screen name="NewScheduling" component={NewScheduling} />
        <App.Screen name="ConfigPage" component={ConfigPage} />
        <App.Screen name="SchedulingDetails" component={SchedulingDetails} />
       </App.Navigator> 
    ) 
}