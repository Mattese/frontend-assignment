import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import App from './App';
import GlobalStyles from './GlobalStyles';
import WebVitals from './WebVitals';
import './i18n/i18n';
import {store} from './store/store';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={theme}>
        <HelmetProvider>
          <App />
          <GlobalStyles />
          <WebVitals showStatusInConsoleLog />
        </HelmetProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
