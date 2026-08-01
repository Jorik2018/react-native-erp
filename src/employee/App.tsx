/**Cannot find module 'expo-status-bar' or its corresponding type declarations.ts(2307) */
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UsersProvider } from './context/UserContext';

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  console.log(isLoadingComplete);
  /*if (!isLoadingComplete) {
    return null;
  } else {*/
    return (
        <SafeAreaProvider>
          <UsersProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </UsersProvider>
        </SafeAreaProvider>
    );
 // }
}
