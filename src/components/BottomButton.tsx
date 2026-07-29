import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from 'react-native';
import type { ReactNode } from 'react';

type BottomButtonProps = {
  onPressFunction: (
    event?: GestureResponderEvent,
  ) => void;
  buttonText: string;
  children?: ReactNode;
};

export default function BottomButton({
  onPressFunction,
  buttonText,
  children,
}: BottomButtonProps) {
  return (
    <View style={styles.bottomButton}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onPressFunction}
      >
        <View>
          <Text style={styles.bottomButtonText}>
            {buttonText}
          </Text>

          {children}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: 'black',
    marginTop: 'auto',
    margin: 20,
    padding: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },

  bottomButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});