import { useContext } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  type ListRenderItem,
} from 'react-native';
import {
  Avatar,
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

type UsersAction = {
  type: 'deleteUser';
  payload: User;
};

type UsersContextValue = {
  state: UsersState;
  dispatch: (action: UsersAction) => void;
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

  const renderUser: ListRenderItem<User> = ({
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
          user.avatarUrl
            ? undefined
            : user.name.charAt(0).toUpperCase()
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

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Editar ${user.name}`}
        hitSlop={8}
        onPress={event => {
          event.stopPropagation();
          navigation.navigate('UserForm', user);
        }}
      >
        <MaterialIcons
          name="edit"
          size={25}
          color="orange"
        />
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Eliminar ${user.name}`}
        hitSlop={8}
        onPress={event => {
          event.stopPropagation();
          confirmDeletion(user);
        }}
      >
        <MaterialIcons
          name="delete"
          size={25}
          color="red"
        />
      </Pressable>
    </ListItem>
  );

  return (
    <FlatList
      data={state.users}
      keyExtractor={user => String(user.id)}
      renderItem={renderUser}
      keyboardShouldPersistTaps="handled"
    />
  );
}