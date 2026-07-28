import React, { useEffect } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppAuthView } from './AppAuthView';
import { useDispatch, useSelector} from 'react-redux';
import HomeApp from './home/App';
//import AuthScreen from './screens/AuthScreen';
import LoginScreen from './auth/LoginScreen';
import { loadTokenFromStorage } from './authSlice';
const Stack = createStackNavigator();

function App() {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  useEffect(() => {
    loadTokenFromStorage();
    //dispatch(setupTokenRefresh());
  }, [dispatch]);

  console.log('isLoggedIn',isLoggedIn);
  useEffect(() => {
    // Handle deep links when the app is already running
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      Alert.alert('Deep Link URL', url);
    };
    const subscription = Linking.addEventListener('url', handleDeepLink);
    const getUrlAsync = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          Alert.alert('App Launched with URL', initialUrl);
        } else {
          Alert.alert('No Initial URL', 'The app was not launched with a deep link.');
        }
      } catch (err: any) {
        Alert.alert('Error Getting Initial URL', err.message);
      }
    };
    getUrlAsync();
    return () => {
      subscription.remove();
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const linking:any = {
    prefixes: ['myapp://', 'https://example.com'], // URLs que abren tu app
    config: {
      screens: {
        home: {
          screens: {
            default: '',
            configuration: 'configuration',
            'code-licenses': 'code-licenses',
            'select-company': 'select-company'
          },
        },
        auth: 'auth',
      },
    },
  };

//linking={linking}
  return <NavigationContainer >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <Stack.Navigator 
        screenOptions={{ headerShown: false }} 
        initialRouteName={isLoggedIn ? 'home' : 'auth'}>
       
            <Stack.Screen name="home" component={HomeApp} />
            <Stack.Screen name="appAuthView" component={AppAuthView} />
       
            <Stack.Screen
              name="auth"
              component={() => (
                <LoginScreen />
              )}
            />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>;
}

export default App;
