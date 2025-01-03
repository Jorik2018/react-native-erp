import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import  PropTypes from "prop-types";

class EditEmployeeModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        closeModal:PropTypes.any,
        selectedEmployee:PropTypes.any,
        updateEmployee:PropTypes.any
      };




    constructor(props:any) {
        super(props);
        this.state = {
            name: "",
            salary: "",
            age: "",
            loading: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        // state value is updated by selected employee data
        const { employee_name, employee_age, employee_salary } = (this.props as any).selectedEmployee;
        this.setState({
            name: employee_name,
            age: employee_age,
            salary: employee_salary
        })
    }

    handleChange = (value:any, state:any) => {
        this.setState({ [state]: value })
    }

    updateEmployee = () => {
        // destructure state
        const { name, age, salary } = this.state as any;
        this.setState({ errorMessage: "", loading: true });

        if (name && age && salary) {
            // selected employee is updated with employee id
            fetch(`http://dummy.restapiexample.com/api/v1/update/${(this.props as any).selectedEmployee.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    salary:salary,
                    age: age
                })
            })
                .then(res => res.json())
                .then(res => {
                    var props =this.props as any;
                    props.closeModal();
                    props.updateEmployee({
                        employee_name: res.name,
                        employee_age: res.age,
                        employee_salary: res.salary,
                        id: props.selectedEmployee.id
                    });
                })
                .catch(() => {
                    this.setState({ errorMessage: "Network Error. Please try again.", loading: false })
                })
        } else {
            this.setState({ errorMessage: "Fields are empty.", loading: false })
        }
    }

    render() {
        const { isOpen, closeModal } = this.props as any;
        const { name, age, salary, loading, errorMessage } = this.state as any;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Update Employee</Text>

                    <TextInput
                        value={name}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "name")}
                        placeholder="Full Name" />

                    <TextInput
                        defaultValue={salary}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "salary")}
                        placeholder="salary" />
                    <TextInput
                        defaultValue={age}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "age")}
                        placeholder="Age" />

                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.updateEmployee}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}



export default EditEmployeeModal;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})