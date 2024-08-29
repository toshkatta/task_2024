import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { applicationMounted } from '@/store/app/actions';

import CoinDetails from '@/views/pages/CoinDetails';
import ErrorPage from '@/views/pages/ErrorPage';

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
