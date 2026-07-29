import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import moment, {type MomentInput} from 'moment';

import Color from './Color';
import {TIME_FORMAT} from './Constant';

type Position = 'left' | 'right';

type ChatMessage = {
  createdAt?: MomentInput;
};

type PositionedStyle<T> = Partial<
  Record<Position, StyleProp<T>>
>;

type TimeProps = {
  position?: Position;
  currentMessage?: ChatMessage;
  containerStyle?: PositionedStyle<ViewStyle>;
  textStyle?: PositionedStyle<TextStyle>;
  timeFormat?: string;
  locale?: string;
};

const emptyMessage: ChatMessage = {};

export default function Time({
  position = 'left',
  currentMessage = emptyMessage,
  containerStyle = {},
  textStyle = {},
  timeFormat = TIME_FORMAT,
  locale = 'en',
}: TimeProps) {
  if (!currentMessage.createdAt) {
    return null;
  }

  const formattedTime = moment(currentMessage.createdAt)
    .locale(locale)
    .format(timeFormat);

  return (
    <View
      style={[
        styles[position].container,
        containerStyle[position],
      ]}
    >
      <Text
        style={[
          styles[position].text,
          textStyle[position],
        ]}
      >
        {formattedTime}
      </Text>
    </View>
  );
}

const sharedContainerStyle: ViewStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
};

const sharedTextStyle: TextStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

const styles = {
  left: StyleSheet.create({
    container: {
      ...sharedContainerStyle,
    },
    text: {
      color: Color.timeTextColor,
      ...sharedTextStyle,
    },
  }),

  right: StyleSheet.create({
    container: {
      ...sharedContainerStyle,
    },
    text: {
      color: Color.white,
      ...sharedTextStyle,
    },
  }),
};