import PrivateRoute from './PrivateRoute';
import PrivatePageSample from '../pages/PrivatePageSample';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import { ProfileCreate } from '../pages/profile/ProfileCreateAndUpdate';
import ProfileView from '../pages/profile/ProfileView';

import MainLayout from '../layout/MainLayout';
import Location from '../pages/order/Location';
import Menus from '../pages/dashboardShopowner/menus/Menus';
import PrivateLayout from '../layout/PrivateLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import OrderList from '../pages/orderList/OrderList';
import RootSelector from './RootSelector';
import Cart from '../pages/cart/Cart';
import UserMenuDetail from '../pages/userMenu/UserMenuDetail';
import Register from '../pages/auth/register/Register';
import Login from '../pages/auth/login/Login';
import OTP from '../pages/auth/otp/OTP';

export const routes = [
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <ProfileCreate /> },
      { path: 'profile/:id', element: <ProfileCreate /> },
      { path: 'view/:id', element: <ProfileView /> },
    ],
  },
  {
    path: '/private',
    element: <PrivateRoute allowedRoles={['admin']} />,
    children: [
      { index: true, element: <PrivatePageSample /> },

      {
        path: '',
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'cart', element: <Cart /> },
          { path: 'signup', element: <Register /> },
          { path: 'login', element: <Login /> },
          { path: 'otp', element: <OTP /> },
        ],
      },

      {
        element: (
          <PrivateRoute allowedRoles={['user']} deniedRoles={['owner', 'admin', 'delivery']} />
        ),
        children: [
          {
            path: '',
            element: <MainLayout />,
            children: [
              { path: 'order', element: <Location /> },
              { path: 'menu/:id', element: <UserMenuDetail /> },
              { path: 'order_list', element: <OrderList /> },
            ],
          },
        ],
      },

      {
        path: '',
        element: <PrivateLayout />,
        children: [
          {
            path: 'dashboard',
            element: (
              <PrivateRoute allowedRoles={['owner', 'admin', 'delivery']} deniedRoles={['user']} />
            ),
            children: [{ index: true, element: <Dashboard /> }],
          },
          {
            path: 'menus',
            element: (
              <PrivateRoute allowedRoles={['owner']} deniedRoles={['user']} />
            ),
            children: [{ index: true, element: <Menus /> }],
          },
        ],
      },

      { path: '403', element: <Error errorType="403" /> },
      { path: '*', element: <Error errorType="404" /> },
    ],
  },

  // fallback and error routes
  { path: '*', element: <Error errorType="404" /> },
  { path: '/403', element: <Error errorType="403" /> },
];
