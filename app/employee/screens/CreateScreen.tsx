import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Text, Input } from '@rneui/themed'
import firestore from '@react-native-firebase/firestore'

const CreateScreen = ({navigation}:any) => {
    const [student, setStudent] = useState({
        name: '',
        age: '',
        school: '',
        department: '',
        type: 'student'
    })

    
    const resetForm = () => {
        setStudent({
            name: '',
            age: '',
            school: '',
            department: '',
            type: 'student'
        })
    }


    const createStudent = async (student:any) => {
        try {
            await firestore().collection('students').add(student)
            resetForm()
            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{flex: 1, justifyContent:'center', paddingHorizontal: 15}}>
            <Text style={{textAlign:'center', marginBottom: 15}}>Create a student</Text>
            <Input 
            value={student.name}
            onChangeText={(name:any) => {setStudent({...student, name: name})}}
            placeholder='Enter name'
            leftIcon={{ type: 'font-awesome', name: 'header'}}
            />
            <Input 
            value={student.age}
            onChangeText={(age:any) => {setStudent({...student, age: age})}}
            placeholder='Enter age'
            leftIcon={{ type: 'font-awesome', name: 'vcard'}}
            />
            <Input 
            value={student.school}
            onChangeText={(school:any) => {setStudent({...student, school: school})}}
            placeholder='Enter school'
            leftIcon={{ type: 'font-awesome', name: 'building-o'}}
            />
            <Input 
            value={student.department}
            onChangeText={(department) => {setStudent({...student, department: department})}}
            placeholder='Enter department'
            leftIcon={{ type: 'font-awesome', name: 'desktop'}}
            />
            <Button title='SEND' onPress={() => {createStudent(student)}}/>
        </View>
    )
}

export default CreateScreen