import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tabs from './navigation/tabs';
import {
  OrderDelivery,
  Restaurants
} from './screens'
import type { RootStackParamList } from './navigation/types';

const Stack =
  createNativeStackNavigator<RootStackParamList>();
  
const App = () => {

  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Home' component={Tabs} />
      <Stack.Screen name='OrderDelivery' component={OrderDelivery} />
      <Stack.Screen name='Restaurants' component={Restaurants} />
    </Stack.Navigator>
  )
}

export default App;