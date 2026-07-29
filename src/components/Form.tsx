import { StyleSheet, View } from 'react-native';

const Form = (props: any) => <View style={styles.form} {...props} />;

const styles = StyleSheet.create({
    form: {
        flex: 1
    },
});

export default Form;