import { useAuthContext } from '@/context/auth.context';
import { Button, Text, View } from 'react-native';

export function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Tela Inicial</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
