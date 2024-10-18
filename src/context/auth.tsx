import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';

interface UserProps {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type: string;
  created_at: string;
  updated_at: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthStateProps {
  user: UserProps;
  token: string;
  refresh_token: string;
}

interface AuthContextData {
  user: UserProps;
  login: ({ email, password }: LoginProps) => void;
  logout: () => void;
  loading: boolean;
  token: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthStateProps>({} as AuthStateProps);
  const [loading, setLoading] = useState(false);

  async function loadStorageData(): Promise<void> {
    const user = await AsyncStorage.getItem('@user');
    const tokenn = await AsyncStorage.getItem('@token');
    const refresh = await AsyncStorage.getItem('@refresh_token');

    if (user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenn}`;
      setData({
        user: JSON.parse(user),
        token: JSON.stringify(tokenn ? tokenn : ''),
        refresh_token: JSON.stringify(refresh ? refresh : ''),
      });
    } else logout();
    setLoading(false);
  }

  const login = async ({ email, password }: LoginProps) => {
    setLoading(true);
    await api
      .post('', { email, password })
      .then(async (response) => {
        const { user, token, refresh_token } = response.data;
        setData({ user, token, refresh_token });

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@refresh_token', refresh_token);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Bem-vindo(a)!',
          textBody: 'Login realizado com sucesso',
        });
      })
      .catch((error) => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Ops!',
          textBody: 'Email ou senha inválidos',
        });
        console.log('Erro Login', error);
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['@token', '@refresh_token', '@user']);

    setData({} as AuthStateProps);
  };

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(logout);
    loadStorageData();

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
