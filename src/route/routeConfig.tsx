import PrivateRoute from './PrivateRoute';
import PrivatePageSample from '../pages/PrivatePageSample';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import { ProfileCreate } from '../pages/profile/ProfileCreateAndUpdate';
import ProfileView from '../pages/profile/ProfileView';


export const routes = [
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
        {path:"/profile", element: <ProfileCreate />},
        {path:"/profile/:id",element:<ProfileCreate/>},
        {path:"/view/:id", element: <ProfileView />},

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
