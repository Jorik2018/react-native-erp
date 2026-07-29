import {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  type StyleProp,
  type TextStyle,
  type TouchableWithoutFeedbackProps,
  type ViewStyle,
} from 'react-native';
//import Clipboard from '@react-native-clipboard/clipboard';

import MessageText from './MessageText';
import MessageImage from './MessageImage';
import Time from './Time';
import Color from './Color';

import {
  isSameDay,
  isSameUser,
} from './utils';

type Position = 'left' | 'right';
type MessageId = string | number;

export type ChatUser = {
  _id: MessageId;
  name?: string;
  avatar?: string;
};

export type ChatMessage = {
  _id?: MessageId;
  text?: string | null;
  image?: string | null;
  createdAt?: Date | string | number | null;
  user: ChatUser;
  sent?: boolean;
  received?: boolean;
};

type PositionedStyle<T> = Partial<
  Record<Position, StyleProp<T>>
>;

type ActionSheetOptions = {
  options: string[];
  cancelButtonIndex?: number;
};

type ShowActionSheetWithOptions = (
  options: ActionSheetOptions,
  callback: (buttonIndex?: number) => void,
) => void;

export type BubbleProps = {
  user: ChatUser;

  position?: Position;
  currentMessage?: ChatMessage;
  nextMessage?: Partial<ChatMessage>;
  previousMessage?: Partial<ChatMessage>;

  touchableProps?: Omit<
    TouchableWithoutFeedbackProps,
    'onLongPress'
  >;

  onLongPress?: (
    message: ChatMessage,
  ) => void;

  showActionSheetWithOptions?: ShowActionSheetWithOptions;

  renderMessageImage?: (
    props: BubbleProps,
  ) => React.ReactNode;

  renderMessageText?: (
    props: BubbleProps,
  ) => React.ReactNode;

  renderCustomView?: (
    props: BubbleProps,
  ) => React.ReactNode;

  renderTime?: (
    props: BubbleProps,
  ) => React.ReactNode;

  renderTicks?: (
    message: ChatMessage,
  ) => React.ReactNode;

  containerStyle?: PositionedStyle<ViewStyle>;
  wrapperStyle?: PositionedStyle<ViewStyle>;
  bottomContainerStyle?: PositionedStyle<ViewStyle>;

  containerToNextStyle?: PositionedStyle<ViewStyle>;
  containerToPreviousStyle?: PositionedStyle<ViewStyle>;

  tickStyle?: StyleProp<TextStyle>;
};

const emptyUser: ChatUser = {
  _id: '',
};

const emptyMessage: ChatMessage = {
  user: emptyUser,
  text: null,
  image: null,
  createdAt: null,
};

export default function Bubble({
  user,
  position = 'left',
  currentMessage = emptyMessage,
  nextMessage = {},
  previousMessage = {},
  touchableProps = {},
  onLongPress,
  showActionSheetWithOptions,
  renderMessageImage,
  renderMessageText,
  renderCustomView,
  renderTime,
  renderTicks,
  containerStyle = {},
  wrapperStyle = {},
  bottomContainerStyle = {},
  containerToNextStyle = {},
  containerToPreviousStyle = {},
  tickStyle,
}: BubbleProps) {
  const bubbleProps: BubbleProps = {
    user,
    position,
    currentMessage,
    nextMessage,
    previousMessage,
    touchableProps,
    onLongPress,
    showActionSheetWithOptions,
    renderMessageImage,
    renderMessageText,
    renderCustomView,
    renderTime,
    renderTicks,
    containerStyle,
    wrapperStyle,
    bottomContainerStyle,
    containerToNextStyle,
    containerToPreviousStyle,
    tickStyle,
  };

  const handleLongPress = useCallback(() => {
    if (onLongPress) {
      onLongPress(currentMessage);
      return;
    }

    if (
      !currentMessage.text ||
      !showActionSheetWithOptions
    ) {
      return;
    }

    const options = [
      'Copy Text',
      'Cancel',
    ];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex:
          options.length - 1,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          /*Clipboard.setString(
            currentMessage.text ?? '',
          );*/
        }
      },
    );
  }, [
    currentMessage,
    onLongPress,
    showActionSheetWithOptions,
  ]);

  const bubbleToNextStyle =
    useMemo<StyleProp<ViewStyle>>(() => {
      if (
        isSameUser(
          currentMessage,
          nextMessage,
        ) &&
        isSameDay(
          currentMessage,
          nextMessage,
        )
      ) {
        return StyleSheet.flatten([
          styles[position].containerToNext,
          containerToNextStyle[position],
        ]);
      }

      return undefined;
    }, [
      containerToNextStyle,
      currentMessage,
      nextMessage,
      position,
    ]);

  const bubbleToPreviousStyle =
    useMemo<StyleProp<ViewStyle>>(() => {
      if (
        isSameUser(
          currentMessage,
          previousMessage,
        ) &&
        isSameDay(
          currentMessage,
          previousMessage,
        )
      ) {
        return StyleSheet.flatten([
          styles[position]
            .containerToPrevious,
          containerToPreviousStyle[
            position
          ],
        ]);
      }

      return undefined;
    }, [
      containerToPreviousStyle,
      currentMessage,
      position,
      previousMessage,
    ]);

  const messageImage = () => {
    if (!currentMessage.image) {
      return null;
    }

    if (renderMessageImage) {
      return renderMessageImage(
        bubbleProps,
      );
    }

    return (
      <MessageImage
        currentMessage={
          currentMessage
        }
      />
    );
  };

  const messageText = () => {
    if (!currentMessage.text) {
      return null;
    }

    if (renderMessageText) {
      return renderMessageText(
        bubbleProps,
      );
    }
/**    return (
      <MessageText
        position={position}
        currentMessage={
          currentMessage
        }
      />
    ); */
    return (
      <MessageText
        position={position}
      />
    );
  };

  const customView = () => {
    return renderCustomView
      ? renderCustomView(bubbleProps)
      : null;
  };

  const messageTime = () => {
    if (!currentMessage.createdAt) {
      return null;
    }

    if (renderTime) {
      return renderTime(bubbleProps);
    }

    return (
      <Time
        position={position}
        currentMessage={
          currentMessage
        }
      />
    );
  };

  const ticks = () => {
    if (renderTicks) {
      return renderTicks(
        currentMessage,
      );
    }

    if (
      currentMessage.user?._id !==
      user._id
    ) {
      return null;
    }

    if (
      !currentMessage.sent &&
      !currentMessage.received
    ) {
      return null;
    }

    return (
      <View style={styles.tickView}>
        {currentMessage.sent ? (
          <Text
            style={[
              styles.tick,
              tickStyle,
            ]}
          >
            ✓
          </Text>
        ) : null}

        {currentMessage.received ? (
          <Text
            style={[
              styles.tick,
              tickStyle,
            ]}
          >
            ✓
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={[
        styles[position].container,
        containerStyle[position],
      ]}
    >
      <View
        style={[
          styles[position].wrapper,
          wrapperStyle[position],
          bubbleToNextStyle,
          bubbleToPreviousStyle,
        ]}
      >
        <TouchableWithoutFeedback
          {...touchableProps}
          onLongPress={
            handleLongPress
          }
          accessible
          accessibilityRole="text"
        >
          <View>
            {customView()}
            {messageImage()}
            {messageText()}

            <View
              style={[
                styles.bottom,
                bottomContainerStyle[
                  position
                ],
              ]}
            >
              {messageTime()}
              {ticks()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 10,
      backgroundColor:
        Color.leftBubbleBackground,
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
  }),

  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 10,
      backgroundColor:
        Color.defaultBlue,
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 10,
    },
    containerToPrevious: {
      borderTopRightRadius: 10,
    },
  }),

  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  } satisfies ViewStyle,

  tick: {
    fontSize: 10,
    backgroundColor:
      Color.backgroundTransparent,
    color: Color.white,
  } satisfies TextStyle,

  tickView: {
    flexDirection: 'row',
    marginRight: 10,
  } satisfies ViewStyle,
};