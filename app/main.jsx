import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from 'store/configureStore';

import CoinDetails from './views/pages/CoinDetails';
import ErrorPage from './views/pages/ErrorPage';

import './views/stylesheets/main.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />
  },
  {
    path: '/coins/:id',
    element: <CoinDetails />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
