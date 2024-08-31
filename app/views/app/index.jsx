import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { applicationMounted } from '@/store/app/actions';

import CoinDetails from '@/views/pages/CoinDetails';
import ErrorPage from '@/views/pages/ErrorPage';

import routes from '@/routes';

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.coin,
    element: <CoinDetails />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applicationMounted());
  }, []);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
