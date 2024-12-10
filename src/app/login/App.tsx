import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import RecoveryPasswordScreen from '../../screens/RecoveryPasswordScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
    
      initialRouteName="login"
      screenOptions={{
        gestureEnabled: true,  // Enables swipe gesture
        gestureDirection: 'vertical',  // Swiping up or down to close the screen
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, // Fade in from bottom
      }}>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={LoginScreen} />
              <Stack.Screen
        name="recovery-password/identification"
        options={{ headerShown: false }}
        component={RecoveryPasswordScreen} />

    </Stack.Navigator>
  );
}