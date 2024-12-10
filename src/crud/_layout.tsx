import { createStackNavigator } from '@react-navigation/stack';
import UserList from './views/UserList';
import UserForm from './views/UserForm';
import { Button, Icon } from '@rneui/themed';
import { UsersProvider } from './context/UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UsersProvider>
        <Stack.Navigator
          initialRouteName="UserList">
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => {
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

          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{
              title: "Formulário de Usuários"
            }} />
        </Stack.Navigator>
    </UsersProvider>

  );
}