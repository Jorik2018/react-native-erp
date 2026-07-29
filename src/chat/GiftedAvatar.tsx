import {useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import Color from './Color';

const {
  carrot,
  emerald,
  peterRiver,
  wisteria,
  alizarin,
  turquoise,
  midnightBlue,
} = Color;

const avatarColors = [
  carrot,
  emerald,
  peterRiver,
  wisteria,
  alizarin,
  turquoise,
  midnightBlue,
];

type AvatarRenderer = () => React.ReactNode;

export type GiftedAvatarUser = {
  _id?: string | number;
  name?: string | null;
  avatar?:
    | string
    | number
    | ImageSourcePropType
    | AvatarRenderer
    | null;
};

export type GiftedAvatarProps = {
  user?: GiftedAvatarUser;
  onPress?: (
    props: Omit<GiftedAvatarProps, 'onPress'>,
  ) => void;
  avatarStyle?: StyleProp<ImageStyle | ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const emptyUser: GiftedAvatarUser = {
  name: null,
  avatar: null,
};

function getInitials(name: string): string {
  const parts = name
    .trim()
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0].charAt(0);
  }

  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`;
}

function getAvatarColor(name: string): string {
  const characterSum = Array.from(name).reduce(
    (sum, character) =>
      sum + character.charCodeAt(0),
    0,
  );

  return avatarColors[
    characterSum % avatarColors.length
  ];
}

export default function GiftedAvatar({
  user = emptyUser,
  onPress,
  avatarStyle,
  textStyle,
}: GiftedAvatarProps) {
  const userName = user.name?.trim() ?? '';

  const initials = useMemo(
    () => getInitials(userName),
    [userName],
  );

  const avatarColor = useMemo(
    () => getAvatarColor(userName),
    [userName],
  );

  const handlePress = () => {
    if (!onPress) {
      return;
    }

    onPress({
      user,
      avatarStyle,
      textStyle,
    });
  };

  const renderAvatar = () => {
    const avatar = user.avatar;

    if (typeof avatar === 'function') {
      return avatar();
    }

    if (typeof avatar === 'string') {
      return (
        <Image
          source={{uri: avatar}}
          style={[
            styles.avatar
          ]}
        />
      );
    }

    if (
      typeof avatar === 'number' ||
      (typeof avatar === 'object' &&
        avatar !== null)
    ) {
      return (
        <Image
          source={avatar}
          style={[
            styles.avatar
          ]}
        />
      );
    }

    return null;
  };

  if (!userName && !user.avatar) {
    return (
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel="Avatar"
        style={[
          styles.avatar,
          styles.transparentAvatar,
          avatarStyle,
        ]}
      />
    );
  }

  if (user.avatar) {
    return (
      <TouchableOpacity
        disabled={!onPress}
        onPress={handlePress}
        accessibilityRole="imagebutton"
        accessibilityLabel={
          userName
            ? `Avatar de ${userName}`
            : 'Avatar'
        }
      >
        {renderAvatar()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={handlePress}
      accessibilityRole="imagebutton"
      accessibilityLabel={
        userName
          ? `Avatar de ${userName}`
          : 'Avatar'
      }
      style={[
        styles.avatar,
        {
          backgroundColor: avatarColor,
        },
        avatarStyle,
      ]}
    >
      <Text
        style={[
          styles.text,
          textStyle,
        ]}
      >
        {initials}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  transparentAvatar: {
    backgroundColor:
      Color.backgroundTransparent,
  },

  text: {
    color: Color.white,
    fontSize: 16,
    backgroundColor:
      Color.backgroundTransparent,
    fontWeight: '100',
  },
});