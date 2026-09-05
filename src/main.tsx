//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import materialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import materialCommunityIconsFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import fontAwesomeFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

import './index.css';
import App from './App';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const iconFonts = `
  @font-face {
    font-family: 'MaterialIcons';
    src: url('${materialIconsFont}') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'MaterialCommunityIcons';
    src: url('${materialCommunityIconsFont}') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'FontAwesome';
    src: url('${fontAwesomeFont}') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }
`;

const styleElement = document.createElement('style');
styleElement.setAttribute('data-icon-fonts', 'true');
styleElement.textContent = iconFonts;
document.head.appendChild(styleElement);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento #root');
}

createRoot(rootElement).render(

  <ReduxProvider store={store}>
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PaperProvider>
  </ReduxProvider>
);