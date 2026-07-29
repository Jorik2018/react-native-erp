import {
  Image,
  StyleSheet,
  View,
  type ImageProps,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Message = {
  image?: string | null;
};

type MessageImageProps = {
  currentMessage?: Message;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imageProps?: Omit<ImageProps, 'source' | 'style'>;

  // Se conserva para compatibilidad futura con Lightbox.
  lightboxProps?: Record<string, unknown>;
};

export default function MessageImage({
  currentMessage = {
    image: null,
  },
  containerStyle,
  imageStyle,
  imageProps = {},
}: MessageImageProps) {
  const imageUri = currentMessage.image;

  if (!imageUri) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        {...imageProps}
        source={{uri: imageUri}}
        style={[styles.image, imageStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },

  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});