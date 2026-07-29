import {
  StyleSheet,
  View,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import GiftedAvatar, {
  type GiftedAvatarUser,
} from './GiftedAvatar';
import {
  isSameDay,
  isSameUser,
} from './utils';

type Position = 'left' | 'right';

type ChatMessage = {
  user?: GiftedAvatarUser;
  createdAt?: Date | string | number | null;
};

type PositionedStyle<T> = Partial<
  Record<Position, StyleProp<T>>
>;

type AvatarRenderProps = {
  position: Position;
  currentMessage: ChatMessage;
  previousMessage: ChatMessage;
  nextMessage: ChatMessage;
  renderAvatarOnTop: boolean;
  showAvatarForEveryMessage: boolean;
  containerStyle: PositionedStyle<ViewStyle>;
  imageStyle: PositionedStyle<ImageStyle>;
  onPressAvatar?: (user: GiftedAvatarUser) => void;
};

type AvatarProps = {
  renderAvatarOnTop?: boolean;
  showAvatarForEveryMessage?: boolean;
  position?: Position;
  currentMessage?: ChatMessage;
  previousMessage?: ChatMessage;
  nextMessage?: ChatMessage;
  onPressAvatar?: (user: GiftedAvatarUser) => void;
  renderAvatar?: (
    props: AvatarRenderProps,
  ) => React.ReactNode;
  containerStyle?: PositionedStyle<ViewStyle>;
  imageStyle?: PositionedStyle<ImageStyle>;
};

const emptyMessage: ChatMessage = {};

export default function Avatar({
  renderAvatarOnTop = false,
  showAvatarForEveryMessage = false,
  position = 'left',
  currentMessage = emptyMessage,
  previousMessage = emptyMessage,
  nextMessage = emptyMessage,
  onPressAvatar,
  renderAvatar,
  containerStyle = {},
  imageStyle = {},
}: AvatarProps) {
  const messageUser = currentMessage.user;

  const avatarProps: AvatarRenderProps = {
    position,
    currentMessage,
    previousMessage,
    nextMessage,
    renderAvatarOnTop,
    showAvatarForEveryMessage,
    containerStyle,
    imageStyle,
    onPressAvatar,
  };

  const renderAvatarContent = () => {
    if (renderAvatar) {
      return renderAvatar(avatarProps);
    }

    if (!messageUser) {
      return null;
    }

    return (
      <GiftedAvatar
        user={messageUser}
        avatarStyle={StyleSheet.flatten([
          styles[position].image,
          imageStyle[position],
        ])}
        onPress={() => {
          onPressAvatar?.(messageUser);
        }}
      />
    );
  };

  const messageToCompare = renderAvatarOnTop
    ? previousMessage
    : nextMessage;

  const computedStyle = renderAvatarOnTop
    ? styles[position].onTop
    : styles[position].onBottom;

  if (renderAvatar === null) {
    return null;
  }

  const shouldHideAvatar =
    !showAvatarForEveryMessage &&
    isSameUser(
      currentMessage,
      messageToCompare,
    ) &&
    isSameDay(
      currentMessage,
      messageToCompare,
    );

  if (shouldHideAvatar) {
    return (
      <View
        style={[
          styles[position].container,
          containerStyle[position],
        ]}
      >
        <GiftedAvatar
          avatarStyle={StyleSheet.flatten([
            styles[position].image,
            imageStyle[position],
          ])}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles[position].container,
        computedStyle,
        containerStyle[position],
      ]}
    >
      {renderAvatarContent()}
    </View>
  );
}

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 15,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 30,
      width: 30,
      borderRadius: 15,
    },
  }),

  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 30,
      width: 30,
      borderRadius: 15,
    },
  }),
};