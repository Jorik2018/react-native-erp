import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { AppAuthView } from './AppAuthView';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createStackNavigator();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    // Call the function to get the initial URL
    getUrlAsync();

    // Cleanup event listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  /*const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/



  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        AppAuthView 
      </ScrollView>
    </SafeAreaView>
  );
  /*
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Auth">
            {() => <AuthScreen onLogin={handleLogin} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  */
}

export default App;
