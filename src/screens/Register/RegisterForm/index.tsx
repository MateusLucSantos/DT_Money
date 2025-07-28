import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { PublicStacParamsList } from '@/routes/PublicRoutes';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { schema } from './schema';
import { useAuthContext } from '@/context/auth.context';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { colors } from '@/shared/colors';

export interface FormRegisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const { handleRegister } = useAuthContext();
  const { handlerError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStacParamsList>>();
  async function onSubmit(userData: FormRegisterParams) {
    try {
      await handleRegister(userData);
    } catch (error) {
      handlerError(error, 'Falha ao se cadastrar!');
    }
  }
  return (
    <>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        label="NOME"
        placeholder="Seu nome"
      />
      <AppInput
        control={control}
        name="email"
        leftIconName="mail-outline"
        label="E-MAIL"
        placeholder="email@exemplo.com"
      />
      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Sua senha"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        label="CONFIRME A SENHA"
        placeholder="Confirme a sua senha"
        secureTextEntry
      />

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton iconName="arrow-forward" mode="fill" onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : 'Cadastrar'}
        </AppButton>
      </View>
    </>
  );
}
