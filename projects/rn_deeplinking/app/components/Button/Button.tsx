import React from 'react';
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import styles from './Button.styles';

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default Button;