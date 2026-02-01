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
import {Toaster} from './components/ui/toaster';

const TOAST_CONTAINER_CONFIG = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={theme}>
        <HelmetProvider>
          <Toaster />
          <App />
          <GlobalStyles />
          <WebVitals showStatusInConsoleLog />
        </HelmetProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
