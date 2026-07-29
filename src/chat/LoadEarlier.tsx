import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import Color from './Color';

type LoadEarlierProps = {
  onLoadEarlier?: () => void;
  isLoadingEarlier?: boolean;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activityIndicatorStyle?: StyleProp<ViewStyle>;
};

export default function LoadEarlier({
  onLoadEarlier = () => {},
  isLoadingEarlier = false,
  label = 'Load earlier messages',
  containerStyle,
  wrapperStyle,
  textStyle,
  activityIndicatorStyle,
}: LoadEarlierProps) {
  const renderContent = () => {
    if (!isLoadingEarlier) {
      return (
        <Text style={[styles.text, textStyle]}>
          {label}
        </Text>
      );
    }

    return (
      <View>
        <Text
          style={[
            styles.text,
            textStyle,
            styles.hiddenText,
          ]}
        >
          {label}
        </Text>

        <ActivityIndicator
          color={Color.white}
          size="small"
          style={[
            styles.activityIndicator,
            activityIndicatorStyle,
          ]}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{
        disabled: isLoadingEarlier,
        busy: isLoadingEarlier,
      }}
      style={[
        styles.container,
        containerStyle,
      ]}
      onPress={onLoadEarlier}
      disabled={isLoadingEarlier}
    >
      <View
        style={[
          styles.wrapper,
          wrapperStyle,
        ]}
      >
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },

  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.defaultColor,
    borderRadius: 15,
    height: 30,
    paddingHorizontal: 10,
  },

  text: {
    backgroundColor:
      Color.backgroundTransparent,
    color: Color.white,
    fontSize: 12,
  },

  hiddenText: {
    opacity: 0,
  },

  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
      web: -15,
      default: -15,
    }),
  },
});