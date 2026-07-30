import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RoundedIconButtonProps = {
  onPress: () => void;
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
  iconSize?: number;
  iconColor?: string;
  accessibilityLabel?: string;
  testID?: string;
};

export default function RoundedIconButton({
  onPress,
  iconName,
  iconSize = 18,
  iconColor = '#fff',
  accessibilityLabel,
  testID,
}: RoundedIconButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <MaterialIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#a13ea1',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});