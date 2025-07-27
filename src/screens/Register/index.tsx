import { DismissKeyBoardView } from '@/components/DismissKeyboardView';
import { Text, View } from 'react-native';
import { RegisterForm } from './RegisterForm';
import { AuthHeader } from '@/components/AuthHeader';

export function Register() {
  return (
    <DismissKeyBoardView>
      <View className="w-[82%] flex-1 self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyBoardView>
  );
}
