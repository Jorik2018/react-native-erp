import { useContext } from 'react';
import {
  Alert,
  FlatList,
  type ListRenderItem,
} from 'react-native';
import {
  Avatar,
  Button,
  ListItem,
} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UsersContext from '../context/UserContext';

type User = {
  id: string | number;
  name: string;
  email: string;
  avatarUrl?: string;
};

type UserListProps = {
  navigation: {
    navigate: (
      screen: 'UserForm',
      user?: User,
    ) => void;
  };
};

type UsersState = {
  users: User[];
};

type DeleteUserAction = {
  type: 'deleteUser';
  payload: User;
};

type UsersContextValue = {
  state: UsersState;
  dispatch: (action: DeleteUserAction) => void;
};

export default function UserList({
  navigation,
}: UserListProps) {
  const { state, dispatch } =
    useContext(UsersContext) as UsersContextValue;

  const confirmDeletion = (user: User) => {
    Alert.alert(
      'Excluir usuário',
      'Deseja excluir o usuário?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => {
            dispatch({
              type: 'deleteUser',
              payload: user,
            });
          },
        },
      ],
    );
  };

  const renderUserItem: ListRenderItem<User> = ({
    item: user,
  }) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('UserForm', user)
      }
    >
      <Avatar
        rounded
        source={
          user.avatarUrl
            ? { uri: user.avatarUrl }
            : undefined
        }
        title={
          !user.avatarUrl
            ? user.name.charAt(0).toUpperCase()
            : undefined
        }
      />

      <ListItem.Content>
        <ListItem.Title>
          {user.name}
        </ListItem.Title>

        <ListItem.Subtitle>
          {user.email}
        </ListItem.Subtitle>
      </ListItem.Content>

      <Button
        type="clear"
        accessibilityLabel={`Editar ${user.name}`}
        onPress={() =>
          navigation.navigate('UserForm', user)
        }
        icon={
          <MaterialIcons
            name="edit"
            size={25}
            color="orange"
          />
        }
      />

      <Button
        type="clear"
        accessibilityLabel={`Eliminar ${user.name}`}
        onPress={() => confirmDeletion(user)}
        icon={
          <MaterialIcons
            name="delete"
            size={25}
            color="red"
          />
        }
      />
    </ListItem>
  );

  return (
    <FlatList
      data={state.users}
      keyExtractor={user =>
        user.id.toString()
      }
      renderItem={renderUserItem}
    />
  );
}