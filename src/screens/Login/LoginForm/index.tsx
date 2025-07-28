import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { AuthHeader } from '@/components/AuthHeader';
import { PublicStacParamsList } from '@/routes/PublicRoutes';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { schema } from './schema';
import { useAuthContext } from '@/context/auth.context';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { colors } from '@/shared/colors';

export interface FormLoginParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const { handleAuthenticate } = useAuthContext();
  const { handlerError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStacParamsList>>();

  async function onSubmit(userData: FormLoginParams) {
    try {
      await handleAuthenticate(userData);
    } catch (error) {
      handlerError(error, 'Falha ao logar!');
    }
  }

  return (
    <>
      <AuthHeader />
      <AppInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="email@exemplo.com"
        leftIconName="mail-outline"
      />
      <AppInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="mb-6 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : 'Login'}
        </AppButton>
        <View>
          <Text className="mb-6 text-base text-gray-600">Ainda não possui uma conta?</Text>
          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate('Register')}>
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
}
