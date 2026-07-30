import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { Colors } from '../constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>

        <MaterialIcons
  name={isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
  size={18}
color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
/>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
