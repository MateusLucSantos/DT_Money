import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { AuthHeader } from '@/components/AuthHeader';
import { PublicStacParamsList } from '@/routes/PublicRoutes';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { schema } from './schema';

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

  const navigation = useNavigation<NavigationProp<PublicStacParamsList>>();

  async function onSubmit() {}

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
          Login
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
