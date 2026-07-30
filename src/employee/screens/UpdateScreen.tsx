import { useState } from 'react'
import { View } from 'react-native'
import { Button, Text, Input } from '@rneui/themed'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore'

const UpdateScreen = ({ navigation, route }: any) => {
    const { studentToUpdate } = route.params
    const studentId = studentToUpdate.id
    const [student, setStudent]: [any, any] = useState({
        name: studentToUpdate.name,
        age: studentToUpdate.age,
        school: studentToUpdate.school,
        department: studentToUpdate.department,
        type: 'student'
    })


    const resetForm = () => {
        setStudent({
            name: '',
            age: '',
            school: '',
            department: '',
        })
    }

    const updateStudent = async (student: any) => {
        try {
            await firestore().collection('students').doc(studentId).update(student)
            resetForm()
            navigation.navigate('Feed')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
            <Text style={{ textAlign: 'center', marginBottom: 15 }}>Update a student</Text>
            <Input
                value={student.name}
                onChangeText={(name: any) => {
                    setStudent({ ...student, name });
                }}
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
                onChangeText={(age: any) => {
                    setStudent({ ...student, age });
                }}
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
                onChangeText={(school: any) => {
                    setStudent({ ...student, school });
                }}
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
                onChangeText={(department: any) => {
                    setStudent({ ...student, department });
                }}
                placeholder="Enter department"
                leftIcon={
                    <MaterialIcons
                        name="business"
                        size={22}
                        color="#777"
                    />
                }
            />
            <Button title='SEND' onPress={() => { updateStudent(student) }} />
        </View>
    )
}

export default UpdateScreen