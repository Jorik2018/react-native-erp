import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import Color from './Color';

type SystemMessageData = {
  text?: string;
  system?: boolean;
};

type SystemMessageProps = {
  currentMessage?: SystemMessageData;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function SystemMessage({
  currentMessage = {
    text: '',
    system: false,
  },
  containerStyle,
  wrapperStyle,
  textStyle,
}: SystemMessageProps) {
  if (!currentMessage.text) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.text, textStyle]}>
          {currentMessage.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  wrapper: {},
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 18,
    fontWeight: '300',
  },
});