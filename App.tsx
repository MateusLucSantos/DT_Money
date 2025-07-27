import NavigationRoutes from '@/routes';
import './global.css';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <NavigationRoutes />
      {/* <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent /> */}
    </>
  );
}
