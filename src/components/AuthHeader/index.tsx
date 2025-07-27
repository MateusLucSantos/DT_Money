import { useKeyboardVisible } from '@/shared/hooks/useKeyboardVisible';
import { Image, View } from 'react-native';

export function AuthHeader() {
  const keyboardIsVisible = useKeyboardVisible;

  if (keyboardIsVisible()) return <></>;

  return (
    <View className="min-h-40 w-full items-center justify-center">
      <Image source={require('@/assets/Logo.png')} className="h-[48px] w-[255px]" />
    </View>
  );
}
