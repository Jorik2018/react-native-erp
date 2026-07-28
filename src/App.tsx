import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import { getStateFromPath, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@rneui/themed';

import { AppAuthView } from './AppAuthView';
import HomeNavigator from './home/App';
import LoginScreen from './auth/LoginScreen';
import { loadTokenFromStorage } from './authSlice';
import UserForm from './user/views/UserForm';
import { UsersProvider } from './user/context/UserContext';
import UserList from './user/views/UserList';

const RootStack = createStackNavigator();
const UsersStack = createStackNavigator();
const linking: LinkingOptions<any> = {
  prefixes: [
    'myapp://',
    'http://localhost:5173',
  ],

  config: {
    screens: {
      home: 'home',

      users: {
        path: 'users',
        screens: {
          UserList: '',
          UserForm: 'form',
        },
      },

      appAuthView: 'app-auth',
      auth: 'auth',
    },
  },

  async getInitialURL() {
    if (Platform.OS === 'web') {
      return window.location.href;
    }

    return Linking.getInitialURL();
  },

  subscribe(listener) {
    if (Platform.OS === 'web') {
      const handlePopState = () => {
        listener(window.location.href);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener(
          'popstate',
          handlePopState,
        );
      };
    }

    const subscription = Linking.addEventListener(
      'url',
      ({ url }) => listener(url),
    );

    return () => {
      subscription.remove();
    };
  },
};
console.log(
  'PARSED /users:',
  JSON.stringify(
    getStateFromPath('/users', linking.config),
    null,
    2,
  ),
);
function UsersNavigator() {
  return (
    <UsersStack.Navigator initialRouteName="UserList">
      <UsersStack.Screen
        name="UserList"
        component={UserList}
        options={({ navigation }) => ({
          title: 'Lista de usuarios',
          headerRight: () => (
            <Icon
              onPress={() => {
                console.log(34567);
                navigation.navigate('UserForm')

              }}
              name="add" size={30} />
          ),
        })}
      />

      <UsersStack.Screen
        name="UserForm"
        component={UserForm}
        options={{
          title: 'Formulario de usuarios',
        }}
      />
    </UsersStack.Navigator>
  );
}

function App() {
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    isAuthLoaded,
  } = useSelector(
    (state: any) => state.auth,
  );

  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Debes despachar la acción.
    dispatch(loadTokenFromStorage() as any);
  }, [dispatch]);

  if (!isAuthLoaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const initialState =
    Platform.OS === 'web'
      ? getStateFromPath(
        window.location.pathname,
        linking.config,
      )
      : undefined;

  console.log(
    'URL inicial:',
    window.location.pathname,
  );

  console.log(
    'Estado inicial:',
    JSON.stringify(initialState, null, 2),
  );
  return (
    <UsersProvider >
      <NavigationContainer
        linking={linking}
        initialState={initialState}
        onReady={() => {
          console.log(
            'Navigation ready:',
            window.location.pathname,
          );
        }}
        onStateChange={state => {
          console.log(
            'Navigation state:',
            JSON.stringify(state, null, 2),
          );
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle={
              isDarkMode
                ? 'light-content'
                : 'dark-content'
            }
          />

          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
          >
            {isLoggedIn ? (
              <>
                <RootStack.Screen
                  name="home"
                  component={HomeNavigator}
                />

                <RootStack.Screen
                  name="users"
                  component={UsersNavigator}
                />

                <RootStack.Screen
                  name="appAuthView"
                  component={AppAuthView}
                />
              </>
            ) : (
              <RootStack.Screen
                name="auth"
                component={LoginScreen}
              />
            )}
          </RootStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </UsersProvider>
  );
}

export default App;
