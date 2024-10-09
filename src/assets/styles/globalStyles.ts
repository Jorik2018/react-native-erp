import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const globalStyles = StyleSheet.create({
  scrollable: {
    flex: 1,
    padding: 28
  },
  infoText: {
    marginBottom: 20,
    color:'#374151',
    lineHeight: 25,
    fontFamily: 'sans-serif',
    fontSize: 16,
  },
  fontFamily: {fontFamily:'sans-serif'},
  input: {
    marginTop: 20,
    backgroundColor: 'white'
  },
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