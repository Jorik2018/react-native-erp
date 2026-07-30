import type { ImageSourcePropType } from 'react-native';

export type AppImage =
  | string
  | ImageSourcePropType;

export function toImageSource(
  source: AppImage,
): ImageSourcePropType {
  if (typeof source === 'string') {
    return {
      uri: source,
    };
  }

  return source;
}