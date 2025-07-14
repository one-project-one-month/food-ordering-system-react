import PrivateRoute from './PrivateRoute';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import MainLayout from '../layout/MainLayout';
import Location from '../pages/order/Location';
import Menus from '../pages/dashboardShopowner/menus/Menus';
import PrivateLayout from '../layout/PrivateLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import OrderList from '../pages/orderList/OrderList';
import RootSelector from './RootSelector';
import Cart from '../pages/cart/Cart';
import UserMenuDetail from '../pages/userMenu/UserMenuDetail';

export const routes = [
  {
    path: '/',
    element: <RootSelector />,
  },
  {
    path: '/',
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> }, // public route
          { path: '/cart', element: <Cart /> },
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
            path: 'order_list',
            element: <PrivateRoute allowedRoles={['owner']} deniedRoles={['user']} />,
            children: [{ index: true, element: <OrderList /> }],
          },
          {
            path: 'menus',
            element: <PrivateRoute allowedRoles={['owner']} deniedRoles={['user']} />,
            children: [{ index: true, element: <Menus /> }],
          },
        ],
      },
      { path: '403', element: <Error errorType="403" /> },
      { path: '*', element: <Error errorType="404" /> },
    ],
  },
  // {
  //   path: 'dashboardShopowner',
  //   element: <DashboardShopOwner />,
  //   children: [
  //     {
  //       index: true,
  //       element: <DashShopowerHome />,
  //     },
  //     {
  //       path: 'categories',
  //       element: <Categories />,
  //     },
  //     {
  //       path: 'Menus',
  //       element: <Menus />,
  //     },
  //     {
  //       path: 'Extras',
  //       element: <Extras />,
  //     },
  //   ],
  // },
];
