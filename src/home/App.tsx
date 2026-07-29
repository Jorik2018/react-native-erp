import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ConfigurationScreen from './ConfigurationScreen';
import CodeLicensesScreen from './CodeLicensesScreen';
import SelectCompanyScreen from './SelectCompanyScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,  // Enables swipe gesture
        gestureDirection: 'vertical',  // Swiping up or down to close the scree/ Fade in from bottom
      }}
      >
      <Stack.Screen
        name="default"
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