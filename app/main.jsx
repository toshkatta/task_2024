import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store/configureStore';

import App from '@/views/app';

import '@/views/stylesheets/main.scss';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
