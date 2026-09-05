import { useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  NavigationContainer,
  type LinkingOptions,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

LoginScreen
import { AppAuthView } from './AppAuthView';
import HomeNavigator from './home/App';
import FoodNavigator from './food/App';
import LoginScreen2 from './login_signup/LoginScreen';
import LoginScreen from './auth/LoginScreen';
import { loadTokenFromStorage } from './authSlice';

import UserForm from './user/views/UserForm';
import UserList from './user/views/UserList';
import { UsersProvider } from './user/context/UserContext';
import PasswordScreen from './login_signup/PasswordScreen';
const PATH_LOGIN = import.meta.env.VITE_PATH_LOGIN ?? '/login';


const RootStack = createNativeStackNavigator();
const UsersStack = createNativeStackNavigator();

const linking: LinkingOptions<any> = {
  prefixes: [
    'myapp://',
    'http://localhost:7777',
    'https://web.regionancash.gob.pe'
  ],

  config: {
    screens: {
      home: 'home',

      login: {
        path: PATH_LOGIN.replace(/^\//, ''),
        parse: {
          destiny: (value: string) => value,
        },
      },

      password: {
        path: 'password',
        parse: {
          destiny: (value: string) => value,
        },
      },

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
};
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
              name="add"
              size={30}
              onPress={() => {
                navigation.navigate('UserForm');
              }}
            />
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
  } = useSelector((state: any) => state.auth);

  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
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

  return (
    <UsersProvider>
      <NavigationContainer linking={linking}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle={
              isDarkMode
                ? 'light-content'
                : 'dark-content'
            }
          />

          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {isLoggedIn ? (
              <>
                <RootStack.Screen
                  name="home"
                  component={HomeNavigator}
                />
                <RootStack.Screen
                  name="food"
                  component={FoodNavigator}
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
              <>
              <RootStack.Screen
                name="login"
                component={LoginScreen2}
              />
              <RootStack.Screen
                name="password"
                component={PasswordScreen}
              />
              
              <RootStack.Screen
                name="auth"
                component={LoginScreen}
              /></>
            )}
          </RootStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </UsersProvider>
  );
}

export default App;