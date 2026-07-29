import { Linking, Platform, Text } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

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
