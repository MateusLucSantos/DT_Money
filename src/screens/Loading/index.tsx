import { useAuthContext } from '@/context/auth.context';
import { colors } from '@/shared/colors';
import { useEffect } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  setLoading: (value: boolean) => void;
}

export function Loading({ setLoading }: Props) {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();

        if (!user) {
          await handleLogout();
        }
      } catch (error) {
        await handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background-primary">
      <>
        <Image className="h-[48px] w-[255px]" source={require('@/assets/Logo.png')} />
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  );
}
