import { DismissKeyBoardView } from '@/components/DismissKeyboardView';
import { View } from 'react-native';
import { LoginForm } from './LoginForm';

export function Login() {
  return (
    <DismissKeyBoardView>
      <View className="w-[82%] flex-1 self-center">
        <LoginForm />
      </View>
    </DismissKeyBoardView>
  );
}
