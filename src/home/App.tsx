import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ConfigurationScreen from './ConfigurationScreen';
import CodeLicensesScreen from './CodeLicensesScreen';
import SelectCompanyScreen from './SelectCompanyScreen';

const Stack = createStackNavigator();

export default function HomeApp() {
  return (
    <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,  // Enables swipe gesture
      gestureDirection: 'vertical',  // Swiping up or down to close the screen
      cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, // Fade in from bottom
    }}
      initialRouteName="home">
      <Stack.Screen
        name="home"
        options={{ headerShown: false }}
        component={HomeScreen} />

      <Stack.Screen 
        name="configuration"
        component={ConfigurationScreen}
        options={{ 
          title: "Configuration",
          headerShown: false
        }} />
      <Stack.Screen
        name="code-licenses"
        component={CodeLicensesScreen}
        options={{
          title: "Code Licenses",
          headerShown: false
        }} />
      <Stack.Screen
        name="select-company"
        component={SelectCompanyScreen}
        options={{
          title: "Select Company",
          headerShown: false
        }} />
    </Stack.Navigator>
  );
}