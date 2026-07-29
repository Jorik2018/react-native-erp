import {useCallback, useMemo} from 'react';
import {
  Linking,
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import ParsedText, {
  type ParseShape,
} from 'react-native-parsed-text';

const WWW_URL_PATTERN = /^www\./i;

type MessagePosition = 'left' | 'right';

type Message = {
  text?: string;
};

type ActionSheetOptions = {
  options: string[];
  cancelButtonIndex?: number;
};

type ShowActionSheetWithOptions = (
  options: ActionSheetOptions,
  callback: (buttonIndex?: number) => void,
) => void;

type MessageTextProps = {
  position?: MessagePosition;
  currentMessage?: Message;

  containerStyle?: Partial<
    Record<MessagePosition, StyleProp<ViewStyle>>
  >;

  textStyle?: Partial<
    Record<MessagePosition, StyleProp<TextStyle>>
  >;

  linkStyle?: Partial<
    Record<MessagePosition, StyleProp<TextStyle>>
  >;

  customTextStyle?: StyleProp<TextStyle>;

  textProps?: Record<string, unknown>;

  parsePatterns?: (
    linkStyle: StyleProp<TextStyle>,
  ) => ParseShape[];

  showActionSheetWithOptions?: ShowActionSheetWithOptions;
};

export default function MessageText({
  position = 'left',
  currentMessage = {
    text: '',
  },
  containerStyle = {},
  textStyle = {},
  linkStyle = {},
  customTextStyle,
  textProps = {},
  parsePatterns = () => [],
  showActionSheetWithOptions,
}: MessageTextProps) {
  const handleUrlPress = useCallback(
    async (url: string): Promise<void> => {
      const normalizedUrl = WWW_URL_PATTERN.test(url)
        ? `https://${url}`
        : url;

      try {
        const supported =
          await Linking.canOpenURL(normalizedUrl);

        if (!supported) {
          console.error(
            'No handler for URL:',
            normalizedUrl,
          );
          return;
        }

        await Linking.openURL(normalizedUrl);
      } catch (error) {
        console.error(
          'Could not open URL:',
          normalizedUrl,
          error,
        );
      }
    },
    [],
  );

  const handlePhonePress = useCallback(
    (phone: string): void => {
      const options = ['Call', 'Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;

      if (!showActionSheetWithOptions) {
        Linking.openURL(`tel:${phone}`).catch(error => {
          console.error(
            'Could not open phone application:',
            error,
          );
        });
        return;
      }

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              Linking.openURL(`tel:${phone}`).catch(
                console.error,
              );
              break;

            case 1:
              Linking.openURL(`sms:${phone}`).catch(
                console.error,
              );
              break;

            default:
              break;
          }
        },
      );
    },
    [showActionSheetWithOptions],
  );

  const handleEmailPress = useCallback(
    (email: string): void => {
      Linking.openURL(`mailto:${email}`).catch(error => {
        console.error(
          'Could not open email application:',
          error,
        );
      });
    },
    [],
  );

  const flattenedLinkStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles[position].link,
        linkStyle[position],
      ]),
    [linkStyle, position],
  );

  const patterns = useMemo<ParseShape[]>(
    () => [
      ...parsePatterns(flattenedLinkStyle),
      {
        type: 'url',
        style: flattenedLinkStyle,
        onPress: handleUrlPress,
      },
      {
        type: 'phone',
        style: flattenedLinkStyle,
        onPress: handlePhonePress,
      },
      {
        type: 'email',
        style: flattenedLinkStyle,
        onPress: handleEmailPress,
      },
    ],
    [
      flattenedLinkStyle,
      handleEmailPress,
      handlePhonePress,
      handleUrlPress,
      parsePatterns,
    ],
  );

  return (
    <View
      style={[
        styles[position].container,
        containerStyle[position],
      ]}
    >
      <ParsedText
        style={[
          styles[position].text,
          textStyle[position],
          customTextStyle,
        ]}
        parse={patterns}
        childrenProps={textProps}
      >
        {currentMessage.text ?? ''}
      </ParsedText>
    </View>
  );
}

const sharedTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 21,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 15,
  marginRight: 15,
  fontFamily: 'Rubik-Regular',
  letterSpacing: 0.2,
};

const styles = {
  left: StyleSheet.create({
    container: {},
    text: {
      color: '#53575e',
      ...sharedTextStyle,
    },
    link: {
      color: '#2f78cc',
      textDecorationLine: 'underline',
    },
  }),

  right: StyleSheet.create({
    container: {},
    text: {
      color: '#ffffff',
      ...sharedTextStyle,
    },
    link: {
      color: '#ffffff',
      textDecorationLine: 'underline',
    },
  }),
};