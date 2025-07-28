import { FormLoginParams } from '@/screens/Login/LoginForm';
import { FormRegisterParams } from '@/screens/Register/RegisterForm';
import { dtMoneyApi } from '@/shared/api/dt-money';
import { IAuthenticateResponse } from '@/shared/interfaces/https/authenticate-response';

export async function authenticate(userData: FormLoginParams): Promise<IAuthenticateResponse> {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>('/auth/login', userData);

  return data;
}

export async function registerUser(userData: FormRegisterParams): Promise<IAuthenticateResponse> {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>('/auth/register', userData);

  return data;
}
