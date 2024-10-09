import { createStackNavigator } from '@react-navigation/stack';
import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import App from '../home/App';

const Stack = createStackNavigator();

export default function RootLayout() {

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <App/>;
}