import { FormLoginParams } from '@/screens/Login/LoginForm';
import { FormRegisterParams } from '@/screens/Register/RegisterForm';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

import * as authService from '@/shared/services/dt-money/auth.service';
import { IUser } from '@/shared/interfaces/user-interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAuthenticateResponse } from '@/shared/interfaces/https/authenticate-response';

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleAuthenticate(userData: FormLoginParams) {
    const { token, user } = await authService.authenticate(userData);
    console.log(token, user);

    await AsyncStorage.setItem('dt-money-user', JSON.stringify({ user, token }));

    setUser(user);
    setToken(token);
  }
  async function handleRegister(formData: FormRegisterParams) {
    const { token, user } = await authService.registerUser(formData);

    await AsyncStorage.setItem('dt-money-user', JSON.stringify({ user, token }));

    setUser(user);
    setToken(token);
  }

  async function handleLogout() {
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
  }

  async function restoreUserSession() {
    const userData = await AsyncStorage.getItem('dt-money-user');

    if (userData) {
      const { token, user } = JSON.parse(userData) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }

    return userData;
  }

  return (
    <AuthContext.Provider
      value={{
        handleAuthenticate,
        handleLogout,
        handleRegister,
        token,
        user,
        restoreUserSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
