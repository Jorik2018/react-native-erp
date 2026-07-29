import { useColorScheme } from 'react-native';

import { Colors } from '../constants/Colors';

type Theme = 'light' | 'dark';

export function useThemeColor(
  props: {
    light?: string;
    dark?: string;
  },
  colorName: keyof typeof Colors.light,
): string {
  const colorScheme = useColorScheme();

  const theme: Theme =
    colorScheme === 'dark'
      ? 'dark'
      : 'light';

  return (
    props[theme] ??
    Colors[theme][colorName]
  );
}