import { DismissKeyBoardView } from '@/components/DismissKeyboardView';
import { View } from 'react-native';
import { LoginForm } from './LoginForm';
import { useAuthContext } from '@/context/auth.context';

export function Login() {
  const { user } = useAuthContext();

  return (
    <DismissKeyBoardView>
      <View className="w-[82%] flex-1 self-center">
        <LoginForm />
      </View>
    </DismissKeyBoardView>
  );
}
