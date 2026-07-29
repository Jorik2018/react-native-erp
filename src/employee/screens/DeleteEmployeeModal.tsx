import {Component} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Employee = {
  id: string | number;
  employee_name: string;
  employee_age?: string;
  employee_salary?: string;
};

type DeleteEmployeeModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  selectedEmployee: Employee;
  updateEmployee: (employeeId: string | number) => void;
};

type DeleteEmployeeModalState = {
  loading: boolean;
  errorMessage: string;
};

class DeleteEmployeeModal extends Component<
  DeleteEmployeeModalProps,
  DeleteEmployeeModalState
> {
  state: DeleteEmployeeModalState = {
    loading: false,
    errorMessage: '',
  };

  deleteEmployee = async () => {
    const {
      selectedEmployee,
      closeModal,
      updateEmployee,
    } = this.props;

    this.setState({
      errorMessage: '',
      loading: true,
    });

    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${selectedEmployee.id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}`,
        );
      }

      await response.json();

      updateEmployee(selectedEmployee.id);
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
    const {
      isOpen,
      closeModal,
      selectedEmployee,
    } = this.props;

    const {
      loading,
      errorMessage,
    } = this.state;

    return (
      <Modal
        visible={isOpen}
        onRequestClose={closeModal}
        animationType="slide"
        transparent
      >
        <View style={styles.backgroundContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Would you like to delete employee{' '}
              {selectedEmployee.employee_name}?
            </Text>

            <Text style={styles.subTitle}>
              If you are sure, click Agree.
              Otherwise, click Disagree.
            </Text>

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
                onPress={this.deleteEmployee}
                disabled={loading}
              >
                <Text style={styles.agreeButtonText}>
                  Agree
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.disagreeButton}
                onPress={closeModal}
                disabled={loading}
              >
                <Text style={styles.disagreeButtonText}>
                  Disagree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DeleteEmployeeModal;

const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    width: '90%',
    padding: 15,
    maxHeight: '40%',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,

    // Sombra para web/iOS
    boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  agreeButtonText: {
    color: 'tomato',
    fontSize: 17,
  },
  disagreeButton: {
    marginLeft: 10,
  },
  disagreeButtonText: {
    color: 'skyblue',
    fontSize: 17,
  },
  message: {
    color: 'tomato',
    fontSize: 17,
    marginTop: 10,
  },
});