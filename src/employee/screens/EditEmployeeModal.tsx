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

type EditEmployeeModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  selectedEmployee: Employee;
  updateEmployee: (employee: Employee) => void;
};

type EditEmployeeModalState = {
  name: string;
  salary: string;
  age: string;
  loading: boolean;
  errorMessage: string;
};

class EditEmployeeModal extends Component<
  EditEmployeeModalProps,
  EditEmployeeModalState
> {
  state: EditEmployeeModalState = {
    name: '',
    salary: '',
    age: '',
    loading: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.loadSelectedEmployee();
  }

  componentDidUpdate(
    previousProps: EditEmployeeModalProps,
  ) {
    if (
      previousProps.selectedEmployee.id !==
      this.props.selectedEmployee.id
    ) {
      this.loadSelectedEmployee();
    }
  }

  loadSelectedEmployee = () => {
    const {
      employee_name,
      employee_age,
      employee_salary,
    } = this.props.selectedEmployee;

    this.setState({
      name: employee_name,
      age: employee_age,
      salary: employee_salary,
    });
  };

  handleChange = (
    value: string,
    field: 'name' | 'age' | 'salary',
  ) => {
    this.setState(
      previousState => ({
        ...previousState,
        [field]: value,
      }),
    );
  };

  updateEmployee = async () => {
    const {name, age, salary} = this.state;
    const {
      selectedEmployee,
      closeModal,
      updateEmployee,
    } = this.props;

    this.setState({
      errorMessage: '',
      loading: true,
    });

    if (!name || !age || !salary) {
      this.setState({
        errorMessage: 'Fields are empty.',
        loading: false,
      });
      return;
    }

    try {
      const response = await fetch(
        `http://dummy.restapiexample.com/api/v1/update/${selectedEmployee.id}`,
        {
          method: 'PUT',
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

      updateEmployee({
        id: selectedEmployee.id,
        employee_name:
          result.data?.name ?? result.name ?? name,
        employee_age:
          result.data?.age ?? result.age ?? age,
        employee_salary:
          result.data?.salary ??
          result.salary ??
          salary,
      });

      closeModal();
    } catch (error) {
      console.error(error);

      this.setState({
        errorMessage:
          'Network Error. Please try again.',
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {isOpen, closeModal} = this.props;
    const {
      name,
      age,
      salary,
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
            Update Employee
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
              onPress={this.updateEmployee}
              disabled={loading}
              style={[
                styles.button,
                styles.updateButton,
              ]}
            >
              <Text style={styles.buttonText}>
                Update
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeModal}
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

export default EditEmployeeModal;

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
  updateButton: {
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