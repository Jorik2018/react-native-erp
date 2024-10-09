import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import users from '../../data/users'
import { User } from '@/models/User';

type UserState = { users: User[] };

type UserActionType = { type: string, payload: User | User[] };

const initialState: UserState = { users }

const UsersContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const actions = {
  createUser(state: UserState, action: { payload: User }): UserState {
    const user = action.payload
    user.id = Math.random().toString();
    return {
      ...state,
      users: [...state.users, user]
    }
  },
  updateUser(state: UserState, action: { payload: User }): UserState {
    const updated = action.payload

    return {
      ...state,
      users: state.users.map(u => u.id === updated.id ? updated : u)

    }

  },
  deleteUser(state: UserState, action: { payload: User }): UserState {

    const user = action.payload
    return {
      ...state,
      users: state.users.filter(u => u.id !== user.id)
    }
  }
}


export const UsersProvider = (props: { children: ReactNode }) => {

  function reducer(state: UserState, action: UserActionType): UserState {
    const fn = (actions as { [key: string]: (state: UserState, action: UserActionType) => UserState })[action.type]
    return fn ? fn(state, action) : state
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UsersContext.Provider
      value={{
        state, dispatch
      }}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContext