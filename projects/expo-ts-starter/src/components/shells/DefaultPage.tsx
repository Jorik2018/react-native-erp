import { View, StyleSheet } from 'react-native';

type DefaultPageProps = {
  children: React.ReactNode;
};

export default function DefaultPage({
  children,
}: DefaultPageProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
