import {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Employee = {
  id: string | number;
  employee_name: string;
  employee_age: string;
  employee_salary: string;
};

type AddEmployeeModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  addEmployee: (employee: Employee) => void;
};

type AddEmployeeModalState = {
  name: string;
  salary: string;
  age: string;
  loading: boolean;
  errorMessage: string;
};

class AddEmployeeModal extends Component<
  AddEmployeeModalProps,
  AddEmployeeModalState
> {
  state: AddEmployeeModalState = {
    name: '',
    salary: '',
    age: '',
    loading: false,
    errorMessage: '',
  };

  handleChange = (
    value: string,
    field: 'name' | 'salary' | 'age',
  ) => {
    this.setState(previousState => ({
      ...previousState,
      [field]: value,
    }));
  };

  resetForm = () => {
    this.setState({
      name: '',
      salary: '',
      age: '',
      loading: false,
      errorMessage: '',
    });
  };

  addEmployee = async () => {
    const {name, age, salary} = this.state;
    const {
      closeModal,
      addEmployee,
    } = this.props;

    if (!name || !age || !salary) {
      this.setState({
        errorMessage: 'Fields are empty.',
        loading: false,
      });
      return;
    }

    this.setState({
      errorMessage: '',
      loading: true,
    });

    try {
      const response = await fetch(
        'https://dummy.restapiexample.com/api/v1/create',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            salary,
            age,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}`,
        );
      }

      const result = await response.json();
      const createdEmployee =
        result.data ?? result;

      addEmployee({
        employee_name:
          createdEmployee.name ?? name,
        employee_age:
          createdEmployee.age ?? age,
        employee_salary:
          createdEmployee.salary ?? salary,
        id:
          createdEmployee.id ??
          Date.now(),
      });

      this.resetForm();
      closeModal();
    } catch (error) {
      console.error(error);

      this.setState({
        errorMessage:
          'Network Error. Please try again.',
        loading: false,
      });
    }
  };

  render() {
    const {isOpen, closeModal} = this.props;
    const {
      name,
      salary,
      age,
      loading,
      errorMessage,
    } = this.state;

    return (
      <Modal
        visible={isOpen}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Add New Employee
          </Text>

          <TextInput
            value={name}
            style={styles.textBox}
            onChangeText={text =>
              this.handleChange(text, 'name')
            }
            placeholder="Full Name"
          />

          <TextInput
            value={salary}
            keyboardType="numeric"
            style={styles.textBox}
            onChangeText={text =>
              this.handleChange(text, 'salary')
            }
            placeholder="Salary"
          />

          <TextInput
            value={age}
            keyboardType="numeric"
            style={styles.textBox}
            onChangeText={text =>
              this.handleChange(text, 'age')
            }
            placeholder="Age"
          />

          {loading ? (
            <Text style={styles.message}>
              Please Wait...
            </Text>
          ) : errorMessage ? (
            <Text style={styles.message}>
              {errorMessage}
            </Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.addEmployee}
              disabled={loading}
              style={[
                styles.button,
                styles.submitButton,
              ]}
            >
              <Text style={styles.buttonText}>
                Submit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeModal}
              disabled={loading}
              style={[
                styles.button,
                styles.cancelButton,
              ]}
            >
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AddEmployeeModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 15,
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  submitButton: {
    backgroundColor: 'gray',
  },
  cancelButton: {
    marginLeft: 10,
    backgroundColor: 'tomato',
  },
  buttonText: {
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  message: {
    color: 'tomato',
    fontSize: 17,
  },
});