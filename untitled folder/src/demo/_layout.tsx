import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon,Text } from '@rneui/themed';
//import HomeScreen from '../home/HomeScreen';
//import ConfigurationScreen from '../home/ConfigurationScreen';

const Stack = createStackNavigator();


export default function App() {
  return <Text>demo</Text>
  /*return (
    <Stack.Navigator
      initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
        name="ConfigurationScreen"
        component={ConfigurationScreen}
        options={{
          title: "Formulário de Usuários"
        }} />
    </Stack.Navigator>

  );*/
}