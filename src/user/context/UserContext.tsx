import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
} from 'react';


import users from '../data/users';

type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
};

type State = {
  users: User[];
};

type Action =
  | {
      type: 'createUser';
      payload: Omit<User, 'id'>;
    }
  | {
      type: 'updateUser';
      payload: User;
    }
  | {
      type: 'deleteUser';
      payload: User;
    };

type UsersContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

type UsersProviderProps = {
  children: ReactNode;
};

const initialState: State = {
  users: users as User[],
};

const UsersContext = createContext<UsersContextType | undefined>(
  undefined,
);

const actions = {
  createUser(state: State, action: Extract<Action, { type: 'createUser' }>) {
    const user: User = {
      ...action.payload,
      id: Date.now(),
    };

    return {
      ...state,
      users: [...state.users, user],
    };
  },

  updateUser(state: State, action: Extract<Action, { type: 'updateUser' }>) {
    const updated = action.payload;

    return {
      ...state,
      users: state.users.map((user) =>
        user.id === updated.id ? updated : user,
      ),
    };
  },

  deleteUser(state: State, action: Extract<Action, { type: 'deleteUser' }>) {
    const userToDelete = action.payload;

    return {
      ...state,
      users: state.users.filter(
        (user) => user.id !== userToDelete.id,
      ),
    };
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'createUser':
      return actions.createUser(state, action);

    case 'updateUser':
      return actions.updateUser(state, action);

    case 'deleteUser':
      return actions.deleteUser(state, action);

    default:
      return state;
  }
}

export function UsersProvider({
  children,
}: UsersProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContext;