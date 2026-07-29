import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import moment, {
  type CalendarSpec,
  type MomentInput,
} from 'moment';

import Color from './Color';
import {isSameDay} from './utils';

const calendarFormat: CalendarSpec = {
  lastDay: '[Yesterday]',
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  lastWeek: 'dddd',
  sameElse: 'L',
};

type ChatMessage = {
  createdAt?: MomentInput;
  user?: {
    _id?: string | number;
  };
};

type DayProps = {
  currentMessage?: ChatMessage;
  previousMessage?: ChatMessage;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const emptyMessage: ChatMessage = {};

export default function Day({
  currentMessage = emptyMessage,
  previousMessage = emptyMessage,
  containerStyle,
  wrapperStyle,
  textStyle,
}: DayProps) {
  if (
    !currentMessage.createdAt ||
    isSameDay(currentMessage, previousMessage)
  ) {
    return null;
  }

  const formattedDate = moment(
    currentMessage.createdAt,
  )
    .calendar(null, calendarFormat)
    .toUpperCase();

  return (
    <View
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      <View
        style={[
          styles.wrapper,
          wrapperStyle,
        ]}
      >
        <View style={styles.lineDivider} />

        <Text
          style={[
            styles.text,
            textStyle,
          ]}
        >
          {formattedDate}
        </Text>

        <View style={styles.lineDivider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    backgroundColor:
      Color.backgroundTransparent,
    color: '#35475b',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.5,
    fontFamily: 'Rubik-Medium',
    paddingHorizontal: 25,
  },
  lineDivider: {
    height: 1,
    borderWidth: 0.5,
    flex: 1,
    borderColor: '#e9eef1',
  },
});