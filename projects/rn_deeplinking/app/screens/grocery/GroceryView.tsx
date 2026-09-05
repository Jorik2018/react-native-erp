import React, { useEffect } from 'react';
import { Button, Text, View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchGroceryItemById } from '../../services/GrocerySlice';
import { RootState, useAppDispatch } from '../../store';
import { styles } from './GroceryView.styles';

const GroceryView = ({ route, navigation }: any) => {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const { selectedItem, status, error } = useSelector((state: RootState) => state.grocery);

  useEffect(() => {
    dispatch(fetchGroceryItemById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Item: {selectedItem?.name ?? "Not Found"}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default GroceryView;