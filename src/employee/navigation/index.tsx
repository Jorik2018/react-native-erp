import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type ColorSchemeName } from 'react-native';
//import Colors from '../constants/Colors';
//import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
//import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import type { RootStackParamList, RootTabParamList } from '../types';
import UserList from '../screens/UserList';
import UserForm from '../screens/UserForm';
import EmployeeList from '../screens/EmployeeList';

import { Button, Icon } from '@rneui/base';

const screenOptions: any = {
  headerStyle: {
    backgroundColor: '#faf'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
}

export default function Navigation({  }: { colorScheme: ColorSchemeName }) {
  return (
      <RootNavigator />

  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (<Stack.Navigator
    screenOptions={screenOptions}>


    <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="EmployeeList" component={EmployeeList} options={() => {
        return {
          title: "Employees"
        }
      }}/>
    
    <Stack.Screen name="UserList" component={UserList}
      options={({ navigation }:any) => {
        return {
          title: "Lista de Usuários",
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("UserForm")}
              type="clear"
              icon={<Icon name="add" size={30} color="#fff" />} />
          )
        }
      }} />
    <Stack.Screen name="UserForm" component={UserForm}
      options={{
        title: "Formulário de Usuários"
      }} />
    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="Modal" component={ModalScreen} />
    </Stack.Group>

  </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  //const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne">
      {/*<BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }:any) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <>
            <Pressable
              onPress={() => navigation.navigate('EmployeeList')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="trash"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
            </>
          ),
        })}
      />*/}
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }:any) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
