import { useCallback, useRef } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type ImageStyle,
  //type NativeSyntheticEvent,
  type StyleProp,
  //type TextInputContentSizeChangeEventData,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import {
  DEFAULT_PLACEHOLDER,
  MIN_COMPOSER_HEIGHT,
} from './Constant';
import Color from './Color';

import attachmentIcon from './assets/Attachment-grey.png';
import emojiIcon from './assets/Emoji-default.png';
import { toImageSource } from '../utils/imageSource';

type ContentSize = {
  width: number;
  height: number;
};

type ComposerProps = {
  composerHeight?: number;
  text?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  multiline?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  textInputAutoFocus?: boolean;
  keyboardAppearance?: TextInputProps['keyboardAppearance'];
  textInputProps?: Omit<
    TextInputProps,
    | 'value'
    | 'onChangeText'
    | 'onContentSizeChange'
    | 'style'
  >;

  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  attachmentImageStyle?: StyleProp<ImageStyle>;
  sendImageStyle?: StyleProp<ImageStyle>;

  onTextChanged?: (text: string) => void;
  onInputSizeChanged?: (size: ContentSize) => void;
  onSend?: (
    message: { text: string },
    shouldResetInput: boolean,
  ) => void;
  onAttachmentPress?: () => void;
};

export default function Composer({
  composerHeight = MIN_COMPOSER_HEIGHT,
  text = '',
  placeholder = DEFAULT_PLACEHOLDER,
  multiline = true,
  textInputStyle,
  textInputAutoFocus = false,
  keyboardAppearance = 'default',
  textInputProps = {},
  containerStyle,
  inputWrapperStyle,
  attachmentImageStyle,
  sendImageStyle,
  onTextChanged = () => { },
  onInputSizeChanged = () => { },
  onSend = () => { },
  onAttachmentPress,
}: ComposerProps) {
  const previousContentSize =
    useRef<ContentSize | null>(null);

  const handleContentSizeChange = useCallback(
    (
      event: any//NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
    ) => {
      const { contentSize } = event.nativeEvent;

      if (!contentSize) {
        return;
      }

      const previous =
        previousContentSize.current;

      const hasChanged =
        !previous ||
        previous.width !== contentSize.width ||
        previous.height !== contentSize.height;

      if (!hasChanged) {
        return;
      }

      previousContentSize.current = contentSize;
      onInputSizeChanged(contentSize);
    },
    [onInputSizeChanged],
  );

  const handleSend = useCallback(() => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    onSend(
      {
        text: trimmedText,
      },
      true,
    );
  }, [onSend, text]);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Adjuntar archivo"
        onPress={onAttachmentPress}
        disabled={!onAttachmentPress}
      >
        <Image
          source={toImageSource(attachmentIcon)}
          style={[
            styles.icon,
            attachmentImageStyle,
          ]}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.inputWrapper,
          inputWrapperStyle,
        ]}
      >
        <TextInput
          {...textInputProps}
          value={text}
          placeholder={placeholder}
          multiline={multiline}
          onContentSizeChange={
            handleContentSizeChange
          }
          onChangeText={onTextChanged}
          style={[
            styles.textInput,
            {
              height: composerHeight,
              minHeight: composerHeight,
            },
            textInputStyle,
          ]}
          autoFocus={textInputAutoFocus}
          accessibilityLabel={
            text || placeholder
          }
          enablesReturnKeyAutomatically
          underlineColorAndroid="transparent"
          keyboardAppearance={
            keyboardAppearance
          }
        />
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Enviar mensaje"
        disabled={!text.trim()}
        onPress={handleSend}
      >
        <Image

          src={emojiIcon.toLocaleString()}
          style={[
            styles.icon,
            sendImageStyle,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 54,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E9EEF1',
  },

  inputWrapper: {
    flex: 1,
    minHeight: 34,
    backgroundColor: Color.white,
    borderRadius: 5,
    marginHorizontal: 15,

    shadowOffset: {
      width: -1,
      height: 2,
    },
    shadowOpacity: 0.1,

    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },

  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 0,
      default: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 3,
      default: 3,
    }),
  },

  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});