import {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import Color from './Color';

type ActionOption = (
  props: ActionsProps,
) => void;

type ActionsOptions = Record<
  string,
  ActionOption | undefined
>;

type ShowActionSheetWithOptions = (
  options: {
    options: string[];
    cancelButtonIndex: number;
    tintColor?: string;
  },
  callback: (buttonIndex?: number) => void,
) => void;

export type ActionsProps = {
  onSend?: (...args: unknown[]) => void;
  options?: ActionsOptions;
  optionTintColor?: string;
  icon?: () => React.ReactNode;
  onPressActionButton?: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconTextStyle?: StyleProp<TextStyle>;

  /*
   * Reemplaza el antiguo contextTypes.
   * Debe recibirse desde el componente padre.
   */
  showActionSheetWithOptions?: ShowActionSheetWithOptions;
};

export default function Actions({
  onSend = () => {},
  options = {},
  optionTintColor = Color.optionTintColor,
  icon,
  onPressActionButton,
  wrapperStyle,
  containerStyle,
  iconTextStyle,
  showActionSheetWithOptions,
}: ActionsProps) {
  const onActionsPress = useCallback(() => {
    const entries = Object.entries(options).filter(
      (
        entry,
      ): entry is [string, ActionOption] =>
        typeof entry[1] === 'function',
    );

    if (entries.length === 0) {
      return;
    }

    if (!showActionSheetWithOptions) {
      console.warn(
        'Actions requires showActionSheetWithOptions.',
      );
      return;
    }

    const optionLabels = entries.map(
      ([label]) => label,
    );

    const cancelButtonIndex =
      optionLabels.length - 1;

    showActionSheetWithOptions(
      {
        options: optionLabels,
        cancelButtonIndex,
        tintColor: optionTintColor,
      },
      buttonIndex => {
        if (
          buttonIndex === undefined ||
          buttonIndex < 0 ||
          buttonIndex >= entries.length
        ) {
          return;
        }

        const [, action] = entries[buttonIndex];

        action({
          onSend,
          options,
          optionTintColor,
          icon,
          onPressActionButton,
          wrapperStyle,
          containerStyle,
          iconTextStyle,
          showActionSheetWithOptions,
        });
      },
    );
  }, [
    containerStyle,
    icon,
    iconTextStyle,
    onPressActionButton,
    onSend,
    optionTintColor,
    options,
    showActionSheetWithOptions,
    wrapperStyle,
  ]);

  const renderIcon = () => {
    if (icon) {
      return icon();
    }

    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text
          style={[
            styles.iconText,
            iconTextStyle,
          ]}
        >
          +
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[
        styles.container,
        containerStyle,
      ]}
      onPress={
        onPressActionButton ??
        onActionsPress
      }
    >
      {renderIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },

  wrapper: {
    borderRadius: 13,
    borderColor: Color.defaultColor,
    borderWidth: 2,
    flex: 1,
  },

  iconText: {
    color: Color.defaultColor,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor:
      Color.backgroundTransparent,
    textAlign: 'center',
  },
});