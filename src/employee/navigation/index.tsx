import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ComponentProps } from 'react';
import type { ColorSchemeName } from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import UserList from '../screens/UserList';
import UserForm from '../screens/UserForm';
import EmployeeList from '../screens/EmployeeList';

import type {
  RootStackParamList,
  RootTabParamList,
} from '../types';

import {
  Button,
} from '@rneui/base';

const screenOptions = {
  headerStyle: {
    backgroundColor: '#faf',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold' as const,
  },
};

type NavigationProps = {
  colorScheme: ColorSchemeName;
};

export default function Navigation({
  colorScheme: _colorScheme,
}: NavigationProps) {
  return <RootNavigator />;
}

const Stack =
  createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EmployeeList"
        component={EmployeeList}
        options={{
          title: 'Employees',
        }}
      />

      <Stack.Screen
        name="UserList"
        component={UserList}
        options={({ navigation }) => ({
          title: 'Lista de Usuários',
          headerRight: () => (
            <Button
              onPress={() =>
                navigation.navigate('UserForm')
              }
              type="clear"
              icon={
                <MaterialIcons
                  name="add"
                  size={30}
                  color="#fff"
                />
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="UserForm"
        component={UserForm}
        options={{
          title: 'Formulário de Usuários',
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          title: 'Oops!',
        }}
      />

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab =
  createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="TabOne">
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              name="code"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

type MaterialIconName =
  ComponentProps<typeof MaterialIcons>['name'];

type TabBarIconProps = {
  name: MaterialIconName;
  color: string;
  size?: number;
};

function TabBarIcon({
  name,
  color,
  size = 30,
}: TabBarIconProps) {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={{
        marginBottom: -3,
      }}
    />
  );
}