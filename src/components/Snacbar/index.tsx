import { useSnacbarContext } from '@/context/snackbar.context';
import { Text, View } from 'react-native';

export function Snackbar() {
  const { message, type } = useSnacbarContext();

  if (!message || !type) {
    return <></>;
  }

  const bgColor = `${
    type === 'SUCCESS' ? 'bg-accent-brand-background-primary' : 'bg-accent-red-background-primary'
  }`;

  return (
    <View
      className={`absolute bottom-10 z-10 h-[50px] w-[90%] justify-center self-center rounded-xl ${bgColor} p-2`}>
      <Text className="text-base font-bold text-white">{message}</Text>
    </View>
  );
}
