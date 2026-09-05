import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroceryItems } from '../../services/GrocerySlice';
import { AppDispatch, RootState } from '../../store';

const GroceryList = ({ navigation }: any) => {

    const dispatch = useDispatch<AppDispatch>();

    const { items, status, error } = useSelector((state: RootState) => state.grocery);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGroceryItems());
        }
    }, [status, dispatch]);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1 }}
            onPress={() => navigation.navigate('Details', { id: item.id })}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    if (status === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Grocery List</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default GroceryList;