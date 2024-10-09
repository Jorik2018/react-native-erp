import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import { Redirect, Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RecoveryPasswordScreen from './screens/RecoveryPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import RegisterIdentificationScreen from './screens/RegisterIdentificationScreen';
import HomeScreen from './home/HomeScreen';
import App from './home/App';

SplashScreen.preventAutoHideAsync();

function RootLayout2() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoggedIn) {
      //router.push('/login');
    }
  }, [isLoggedIn]);

  if (!loaded) {
    return null;
  }
  if (!isLoggedIn) {
    router.push('/login');
    return <Redirect href="/login" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Text>holll</Text>
      {/*<Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="-(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="crud" />
        <Stack.Screen name="+not-found" />
      </Stack>*/}
    </ThemeProvider>
  );
}

const SN = createStackNavigator();

/*export default function RootLayout() {
 
  return <Provider store={store}>
    
    <Slot />
    
  </Provider>
}*/

function RootNavigator() {

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <SN.Navigator

      initialRouteName="login"
      screenOptions={{
        gestureEnabled: true,  // Enables swipe gesture
        gestureDirection: 'vertical',
      }}>
      <SN.Screen
        name="login"
        options={{ headerShown: false }}
        component={LoginScreen} />

      <SN.Screen
        name="recovery-password"
        options={{ headerShown: false }}
        component={RecoveryPasswordScreen} />

      <SN.Screen
        name="register"
        options={{ headerShown: false }}
        component={RegisterIdentificationScreen} />

    </SN.Navigator>
  }

  return <App/>

}

export default function RootLayout() {

  return <Provider store={store}>
    <NavigationContainer independent={true}>
      <RootNavigator />
    </NavigationContainer>
  </Provider>

}
