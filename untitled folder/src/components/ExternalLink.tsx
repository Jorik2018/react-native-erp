//import { Link } from 'expo-router';
//import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { GestureResponderEvent, Linking, Platform, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, onPress, children, style }: any) {
  const handlePress = async (event: GestureResponderEvent) => {
    if (Platform.OS !== 'web') {
      event.preventDefault(); // Prevent default browser behavior on native platforms
      await Linking.openURL(href); // Open the URL in the native browser
    } else if (onPress) {
      onPress(event); // Handle custom onPress for web
    }
  };
  return (
   <Text
      style={[{ color: 'blue', textDecorationLine: 'underline' }, style]}
      onPress={handlePress}
    >
      {children}
    </Text>
  );
}
