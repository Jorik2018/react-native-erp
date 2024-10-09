import React, { createContext, useReducer } from 'react';
import users from '../data/users'
// import { Container } from './styles';

const initialState = { users }

const UsersContext = createContext({})

const actions: any = {
    createUser(state: any, action: any) {
        const user = action.payload
        user.id = Math.random()
        return {
            ...state,
            users: [...state.users, user]
        }
    },
    updateUser(state: any, action: any) {
        const updated = action.payload

        return {
            ...state,
            users: state.users.map((u: any) => u.id === updated.id ? updated : u)

        }

    },
    deleteUser(state: any, action: any) {

        const user = action.payload
        return {
            ...state,
            users: state.users.filter((u: any) => u.id !== user.id)
        }
    }
}


export const UsersProvider = (props: any) => {

    function reducer(state: any, action: any) {
        const fn = actions[action.type]
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