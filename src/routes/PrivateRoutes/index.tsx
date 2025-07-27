import { Home } from '@/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type PrivateStackParamsList = {
  Home: undefined;
};

export function PrivateRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator<PrivateStackParamsList>();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
