import React, { useEffect, useState } from 'react';
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
import { Provider/*, useSelector */} from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
//import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
const Stack = createStackNavigator();

function App() {

  const [isAuthenticated, _setIsAuthenticated] = useState(false);

  const handleLogin = () => { }

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

  return <Provider store={store}>
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? 'Home' : 'Auth'}>
       
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AppAuthView" component={AppAuthView} />
       
            <Stack.Screen
              name="Auth"
              component={() => (
                <LoginScreen onLogin={handleLogin} />
              )}
            />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  </Provider>;
}

export default App;
