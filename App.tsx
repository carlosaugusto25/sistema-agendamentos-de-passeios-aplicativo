import { Login } from './src/screens/Login';
import { ThemeProvider } from 'styled-components';
import { useFonts as useInter, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';
import { useFonts as useLexend, Lexend_700Bold, Lexend_600SemiBold, Lexend_400Regular, } from '@expo-google-fonts/lexend';
import { useFonts as useRoboto, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
import theme from './src/theme';
import Routes from './src/routes';
import { AuthProvider } from './src/context/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Platform } from 'react-native';

export default function App() {

  const [interLoaded] = useInter({ Inter_700Bold, Inter_400Regular });
  const [lexendLoaded] = useLexend({ Lexend_700Bold, Lexend_600SemiBold, Lexend_400Regular });
  const [robotoLoaded] = useRoboto({ Roboto_700Bold, Roboto_400Regular });

  if (!interLoaded || !lexendLoaded || !robotoLoaded) return null

  return (
    <AlertNotificationRoot theme={Platform.OS === 'ios' ? 'dark' : 'dark'} toastConfig={{titleStyle: {fontFamily: 'Lexend_600SemiBold', color: theme.COLORS.SECONDARY_BLUE}, textBodyStyle: {fontFamily: 'Lexend_400Regular'}}}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    </AlertNotificationRoot>
  );
}


