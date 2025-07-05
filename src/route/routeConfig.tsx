import PrivateRoute from './PrivateRoute';
import PrivatePageSample from '../pages/PrivatePageSample';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import MainLayout from '../layout/MainLayout';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'private',
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [
          { index: true, element: <PrivatePageSample /> },
        ],
      },

      { path: '403', element: <Error errorType="403" /> },
      { path: '*', element: <Error errorType="404" /> },
    ],
  },
];
