import { useColorScheme as _useColorScheme } from 'react-native';
import type { ColorSchemeName } from 'react-native';

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}
