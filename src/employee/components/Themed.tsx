import {
  Text as DefaultText,
  View as DefaultView,
  type ColorSchemeName,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type ThemeName = 'light' | 'dark';

type ThemeColorProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ThemeColorProps,
  colorName: keyof typeof Colors.light &
    keyof typeof Colors.dark,
): string {
  const colorScheme: ColorSchemeName =
    useColorScheme();

  const theme: ThemeName =
    colorScheme === 'dark'
      ? 'dark'
      : 'light';

  const colorFromProps = props[theme];

  return (
    colorFromProps ??
    Colors[theme][colorName]
  );
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps =
  ThemeProps &
  React.ComponentProps<typeof DefaultText>;

export type ViewProps =
  ThemeProps &
  React.ComponentProps<typeof DefaultView>;

export function Text({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: TextProps) {
  const color = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    'text',
  );

  return (
    <DefaultText
      style={[{color}, style]}
      {...otherProps}
    />
  );
}

export function View({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewProps) {
  const backgroundColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    'background',
  );

  return (
    <DefaultView
      style={[
        {backgroundColor},
        style,
      ]}
      {...otherProps}
    />
  );
}