import {useCallback, useState} from 'react';

import Driver from './screens/Driver';
import Passenger from './screens/Passenger';
import GenericContainer from './components/GenericContainer';
import DriverOrPassenger from './screens/DriverOrPassenger';
import SignUp from './screens/SignUp';

const DriverWithGenericContainer =
  GenericContainer(Driver) as any;

const PassengerWithGenericContainer =
  GenericContainer(Passenger) as any;

type AppState = {
  isDriver: boolean;
  isPassenger: boolean;
  token: string;
  createAccount: boolean;
};

type AppStateKey = keyof AppState;

const initialState: AppState = {
  isDriver: false,
  isPassenger: false,
  token: '',
  createAccount: false,
};

export default function App() {
  const [state, setState] =
    useState<AppState>(initialState);

  const handleChange = useCallback(
    <Key extends AppStateKey>(
      name: Key,
      value: AppState[Key],
    ) => {
      setState(previousState => ({
        ...previousState,
        [name]: value,
      }));
    },
    [],
  );

  if (state.createAccount) {
    return (
      <SignUp
        handleChange={handleChange}
      />
    );
  }

  if (!state.token) {
    return null;

    // Cuando vuelvas a habilitar Login:
    // return (
    //   <Login
    //     handleChange={handleChange}
    //   />
    // );
  }

  if (state.isDriver) {
    return (
      <DriverWithGenericContainer
        token={state.token}
      />
    );
  }

  if (state.isPassenger) {
    return (
      <PassengerWithGenericContainer
        token={state.token}
      />
    );
  }

  return (
    <DriverOrPassenger
      handleChange={handleChange}
    />
  );
}