import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { UsersProvider } from './context/UserContext';

export default function App() {
  alert(12);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  /*if (!isLoadingComplete) {
    return null;
  } else {*/
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <UsersProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </UsersProvider>
        </SafeAreaProvider>
      </PaperProvider>
    );
 // }
}
