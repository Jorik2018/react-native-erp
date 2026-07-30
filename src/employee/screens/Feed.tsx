import { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card, Header } from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Student = {
  id: string;
  name: string;
  age: string;
  school: string;
  department: string;
  type: 'student';
};

type FeedProps = {
  navigation: {
    navigate: (
      screen: 'Update',
      params: {
        studentToUpdate: Student;
      },
    ) => void;
  };
};

export default function Feed({ navigation }: FeedProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteStudent = useCallback(async (id: string) => {
    try {
      await firestore()
        .collection('students')
        .doc(id)
        .delete();
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('students')
      .where('type', '==', 'student')
      .onSnapshot(
        querySnapshot => {
          const studentList: Student[] =
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...(doc.data() as Omit<Student, 'id'>),
            }));

          setStudents(studentList);
          setIsLoading(false);
        },
        error => {
          console.error(
            'Error al obtener estudiantes:',
            error,
          );
          setIsLoading(false);
        },
      );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Header
        placement="left"
        centerComponent={{
          text: 'STUDENTS',
          style: styles.headerTitle,
        }}
        leftComponent={
          <MaterialIcons
            name="people"
            size={24}
            color="#fff"
          />
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {!isLoading && students.length === 0 && (
          <Card>
            <Card.Title>
              No hay estudiantes registrados
            </Card.Title>
          </Card>
        )}

        {students.map(student => (
          <Card key={student.id}>
            <Card.Title style={styles.studentName}>
              {student.name}
            </Card.Title>

            <Card.Divider />

            <Card.Title>
              {student.age} years old,{' '}
              {student.department} student, studying at{' '}
              {student.school}
            </Card.Title>

            <Card.Divider />

            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Editar a ${student.name}`}
                hitSlop={8}
                onPress={() =>
                  navigation.navigate('Update', {
                    studentToUpdate: student,
                  })
                }
              >
                <MaterialIcons
                  name="edit"
                  size={22}
                  color="blue"
                />
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Eliminar a ${student.name}`}
                hitSlop={8}
                onPress={() =>
                  deleteStudent(student.id)
                }
              >
                <MaterialIcons
                  name="delete"
                  size={22}
                  color="red"
                />
              </Pressable>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  headerTitle: {
    color: '#fff',
    marginTop: 2,
  },
  studentName: {
    fontSize: 21,
    color: 'red',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});