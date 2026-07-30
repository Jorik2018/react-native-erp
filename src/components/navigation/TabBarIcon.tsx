import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';

type TabBarIconProps = ComponentProps<typeof MaterialIcons>;

export function TabBarIcon({
  style,
  ...rest
}: TabBarIconProps) {
  return (
    <MaterialIcons
      size={28}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}