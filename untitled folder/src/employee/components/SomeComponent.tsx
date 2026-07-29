import React from 'react';
import { Text } from './Themed';
//import DataTable, { COL_TYPES } from 'react-native-datatable-component';

const SomeComponent = (props:any) => {

    let data=[];

    for(var i=0;i<50;i++)
        data.push({ name: 'Muhammad Rafeh '+i, age: 2*i, gender: 'male' });

    return         <Text
    lightColor="rgba(0,0,0,0.8)"
    darkColor="rgba(255,255,255,0.8)">
    Open up the code for this screen:
  </Text>
    
    /*(
        <DataTable
            data={data} 
            colNames={['name', 'age', 'gender']} //List of Strings
            colSettings={[
              { name: 'name', type: COL_TYPES.STRING, width: '40%' }, 
              { name: 'age', type: COL_TYPES.INT, width: '30%' }, 
              {name: 'gender', type: COL_TYPES.STRING, width: '30%'}
            ]}//List of Objects
            noOfPages={2} //number
            backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
            headerLabelStyle={{ color: 'grey', fontSize: 12 }} //Text Style Works
        />
    )*/;
}

export default SomeComponent;