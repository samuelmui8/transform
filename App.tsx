import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigation/AuthStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthStack />
  );
};

