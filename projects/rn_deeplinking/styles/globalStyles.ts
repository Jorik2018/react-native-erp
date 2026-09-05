import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  } as ViewStyle,
  text: {
    fontSize: 16,
    color: '#333',
  } as TextStyle,
  // Add more global styles here
});

export default globalStyles;