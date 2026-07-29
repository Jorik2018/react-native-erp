import {useMemo} from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import Avatar from './Avatar';
import Day from './Day';

import {isSameDay, isSameUser} from './utils';

type Position = 'left' | 'right';
type MessageId = string | number;

type ChatUser = {
  _id?: MessageId;
  avatar?: string | null;
  name?: string;
};

type ChatMessage = {
  _id?: MessageId;
  text?: string | null;
  image?: string | null;
  createdAt?: Date | string | number | null;
  system?: boolean;
  user?: ChatUser;
  sent?: boolean;
  received?: boolean;
};

type PositionedStyle = Partial<
  Record<Position, StyleProp<ViewStyle>>
>;

type InnerMessageProps = {
  position: Position;
  currentMessage: ChatMessage;
  nextMessage: ChatMessage;
  previousMessage: ChatMessage;
  user: ChatUser;
  showUserAvatar: boolean;
  inverted: boolean;
  isSameUser: typeof isSameUser;
  isSameDay: typeof isSameDay;
};

type MessageProps = {
  renderAvatar?: (
    props: InnerMessageProps,
  ) => React.ReactNode;

  renderBubble?: (
    props: InnerMessageProps,
  ) => React.ReactNode;

  renderDay?: (
    props: InnerMessageProps,
  ) => React.ReactNode;

  renderSystemMessage?: (
    props: InnerMessageProps,
  ) => React.ReactNode;

  position?: Position;
  currentMessage?: ChatMessage;
  nextMessage?: ChatMessage;
  previousMessage?: ChatMessage;
  user?: ChatUser;
  containerStyle?: PositionedStyle;
  showUserAvatar?: boolean;
  inverted?: boolean;
};

const emptyUser: ChatUser = {};

const emptyMessage: ChatMessage = {
  user: emptyUser,
};

export default function Message({
  renderAvatar,
  renderBubble,
  renderDay,
  renderSystemMessage,
  position = 'left',
  currentMessage = emptyMessage,
  nextMessage = emptyMessage,
  previousMessage = emptyMessage,
  user = emptyUser,
  containerStyle = {},
  showUserAvatar = true,
  inverted = true,
}: MessageProps) {
  const innerComponentProps =
    useMemo<InnerMessageProps>(
      () => ({
        position,
        currentMessage,
        nextMessage,
        previousMessage,
        user,
        showUserAvatar,
        inverted,
        isSameUser,
        isSameDay,
      }),
      [
        position,
        currentMessage,
        nextMessage,
        previousMessage,
        user,
        showUserAvatar,
        inverted,
      ],
    );

  const renderDayComponent = () => {
    if (!currentMessage.createdAt) {
      return null;
    }

    return renderDay
      ? renderDay(innerComponentProps)
      : <Day {...innerComponentProps} />;
  };

  const renderBubbleComponent = () => {
    return renderBubble
      ? renderBubble(innerComponentProps)
      : '<Bubble {...innerComponentProps} />';
  };

  const renderSystemMessageComponent = () => {
    return renderSystemMessage
      ? renderSystemMessage(innerComponentProps)
      : '(<SystemMessage currentMessage={currentMessage}/>)';
  };

  const renderAvatarComponent = () => {
    const currentUserId = user._id;
    const messageUser = currentMessage.user;
    const messageUserId = messageUser?._id;

    if (
      currentUserId === messageUserId &&
      !showUserAvatar
    ) {
      return null;
    }

    if (messageUser?.avatar === null) {
      return null;
    }

    return renderAvatar
      ? renderAvatar(innerComponentProps)
      : <Avatar {...innerComponentProps} />;
  };

  const messageContainerStyle = [
    styles[position].container,
    inverted
      ? styles.invertedSpacing
      : styles.normalSpacing,
    containerStyle[position],
  ];

  return (
    <View>
      {renderDayComponent()}

      {currentMessage.system ? (
        renderSystemMessageComponent()
      ) : (
        <View style={messageContainerStyle}>
          {position === 'left'
            ? renderAvatarComponent()
            : null}

          {renderBubbleComponent()}

          {position === 'right'
            ? renderAvatarComponent()
            : null}
        </View>
      )}
    </View>
  );
}

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: 15,
      marginRight: 0,
    },
  }),

  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 15,
    },
  }),

  invertedSpacing: {
    marginBottom: 20,
  } satisfies ViewStyle,

  normalSpacing: {
    marginBottom: 2,
  } satisfies ViewStyle,
};