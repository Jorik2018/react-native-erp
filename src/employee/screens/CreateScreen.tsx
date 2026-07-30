import { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

type Student = {
  name: string;
  age: string;
  school: string;
  department: string;
  type: 'student';
};

type CreateScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const initialStudent: Student = {
  name: '',
  age: '',
  school: '',
  department: '',
  type: 'student',
};

export default function CreateScreen({
  navigation,
}: CreateScreenProps) {
  const [student, setStudent] =
    useState<Student>(initialStudent);

  const updateField = (
    field: keyof Omit<Student, 'type'>,
    value: string,
  ) => {
    setStudent(current => ({
      ...current,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setStudent(initialStudent);
  };

  const createStudent = async () => {
    try {
      await firestore()
        .collection('students')
        .add(student);

      resetForm();
      navigation.navigate('Home');
    } catch (error) {
      console.error(
        'Error al crear estudiante:',
        error,
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 15,
        }}
      >
        Create a student
      </Text>

      <Input
        value={student.name}
        onChangeText={value =>
          updateField('name', value)
        }
        placeholder="Enter name"
        leftIcon={
          <MaterialIcons
            name="person"
            size={22}
            color="#777"
          />
        }
      />

      <Input
        value={student.age}
        onChangeText={value =>
          updateField('age', value)
        }
        placeholder="Enter age"
        keyboardType="numeric"
        leftIcon={
          <MaterialIcons
            name="cake"
            size={22}
            color="#777"
          />
        }
      />

      <Input
        value={student.school}
        onChangeText={value =>
          updateField('school', value)
        }
        placeholder="Enter school"
        leftIcon={
          <MaterialIcons
            name="school"
            size={22}
            color="#777"
          />
        }
      />

      <Input
        value={student.department}
        onChangeText={value =>
          updateField('department', value)
        }
        placeholder="Enter department"
        leftIcon={
          <MaterialIcons
            name="business"
            size={22}
            color="#777"
          />
        }
      />

      <Button
        title="SEND"
        onPress={createStudent}
      />
    </View>
  );
}