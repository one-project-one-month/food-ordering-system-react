import PrivateRoute from './PrivateRoute';
import PrivatePageSample from '../pages/PrivatePageSample';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';

export const routes = [
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/private',
    element: <PrivateRoute allowedRoles={['admin']} />,
    children: [
      { index: true, element: <PrivatePageSample /> },
    ],
  },
  { path: '*', element: <Error errorType="404" /> },
  { path: '/403', element: <Error errorType="403" /> },
];
