import React, { useContext } from 'react';

import { Alert, FlatList } from 'react-native';
import { ListItem, Avatar, Icon } from '@rneui/themed';
import UsersContext from '../context/UserContext';

export default (props: any) => {

  const { state, dispatch } = useContext(UsersContext) as any;


  function confirmDeletion(user: any) {
    Alert.alert('Excluir usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function getUserItem({ item: user }: any) {
    return (
      <ListItem key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}
      >
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="edit" onPress={() => props.navigation.navigate('UserForm', user)} size={25} color="orange" />
        <Icon name="delete" size={25} color="red" onPress={() => confirmDeletion(user)}/>
      </ListItem>
    );
  }

  return (
    <FlatList
      keyExtractor={user => user.id.toString()}
      data={state.users}
      renderItem={getUserItem}

    />
  );
};
