import { useContext } from 'react';
import { Alert, FlatList } from 'react-native'
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import UsersContext from '../context/UserContext';
import { User } from '../../models/User';

export default ({ navigation }: { navigation: any }) => {

  const { state, dispatch } = useContext(UsersContext)

  function confirmDeletion(user: User) {
    Alert.alert('Excluir usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user
          })
        }
      },
      {
        text: 'Não'
      }
    ])

  }

  function getUserItem({ item: user }: { item: User }) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => navigation.navigate('UserForm', user)}
      >
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button onPress={() => navigation.navigate('UserForm', user)}>
          <Icon name="edit" size={25} color="orange" />
        </Button>
        <Button onPress={() => confirmDeletion(user)} >
          <Icon name="delete" size={25} color="red" />
        </Button>
      </ListItem>
    )
  }

  return (
    <FlatList
      keyExtractor={user => user.id.toString()}
      data={state.users}
      renderItem={getUserItem}
    />
  )

}