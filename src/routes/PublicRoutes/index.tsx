import { Login } from '@/screens/Login';
import { Register } from '@/screens/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type PublicStacParamsList = {
  Login: undefined;
  Register: undefined;
};
export function PublicRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator<PublicStacParamsList>();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
