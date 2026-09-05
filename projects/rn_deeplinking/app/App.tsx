import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking, Alert } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { Provider, useSelector } from 'react-redux';
import { RootState, store, useAppDispatch } from './store';
import GroceryView from './screens/grocery/GroceryView';
import { checkLoginStatus } from './services/AuthSlice';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ["myapp://"],
  config: {
    // Initial route name to be added to the stack before any further navigation,
    // should match one of the available screens
    //initialRouteName: "Home" as const,
    initialRouteName: "Login" as const,
    screens: {
      // myapp://home -> HomeScreen
      Login: "login",
      Home: "home",
      // myapp://details/1 -> DetailsScreen with param id: 1
      Details: "details/:id",
    },
  },
};

function AppNavigator() {

  const dispatch = useAppDispatch();

  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkLoginStatus());  // Check login status on app start
  }, [dispatch])

  useEffect(() => {
    const handleDeepLink = (event: any) => {
      Alert.alert('Deep Link', event.url);
    };
    const subscription = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          Alert.alert('getInitialURL', url);
          //handleDeepLink({ url });
        }
      })
      .catch((err) => console.error('An error occurred', err));
    return () => subscription.remove();/*() => {
      Linking.removeEventListener('url', handleDeepLink);
    };*/
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  /*<NavigationContainer linking={linking}>*/
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {(props:any) => <LoginScreen {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={GroceryView} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;