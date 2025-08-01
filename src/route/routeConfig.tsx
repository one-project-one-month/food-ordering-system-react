import PrivateRoute from './PrivateRoute';
import Home from '../pages/home/Home';
import Error from '../pages/error/Error';
import MainLayout from '../layout/MainLayout';
import Location from '../pages/order/Location';
import Menus from '../pages/menus/Menus';
import PrivateLayout from '../layout/PrivateLayout';
import DeliOrderList from '../pages/orderList/DeliOrderList';
import OrderList from '../pages/orderList/OrderList';
import RootSelector from './RootSelector';
import Cart from '../pages/cart/Cart';
import UserMenuDetail from '../pages/userMenu/UserMenuDetail';
import Register from '../pages/auth/register/Register';
import Login from '../pages/auth/login/Login';
import OTP from '../pages/auth/otp/OTP';
import OtpGuard from '../pages/auth/OtpGuard';
import RegisterGuard from '../pages/auth/RegisterGuard';
import CheckMail from '../pages/auth/checkMail/CheckMail';
import Restaurant from '../pages/restaurant/Restaurant';
import Category from '../pages/category/Category';
import { ProfileUpdate } from '../pages/profile/ProfileUpdate';
import ProfileView from '../pages/profile/ProfileView';
import { ProfileCreate } from '../pages/profile/ProfileCreate';
import ApplyRestaurant from '../pages/applyRestaurant/ApplyRestaurant';
import Payment from '../pages/payment/Payment';
import PaymentGuard from '../pages/auth/PaymentGuard';
import Restaurants from '../pages/userRestaurant/Restaurants';
import UserMenu from '../pages/userMenu/UserMenu';
import Dashboard from '../pages/dashboard/Dashboard';


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
          { path: 'restaurants', element: <Restaurants /> },
          { path: 'restaurants/:id', element: <UserMenu /> },
          { path: 'verify_mail', element: <CheckMail /> },
          {
            element: <RegisterGuard />,
            children: [{ path: 'signup', element: <Register /> }],
          },
          { path: 'login', element: <Login /> },
          {
            element: <OtpGuard />,
            children: [{ path: 'otp', element: <OTP /> }],
          },
          { path: 'profile/create/:id', element: <ProfileCreate /> },
          { path: 'profile/edit/:id', element: <ProfileUpdate /> },
          { path: 'view/:id', element: <ProfileView /> },
        ],
      },
      /* private route */
      {
        element: (
          <PrivateRoute allowedRoles={['customer']} deniedRoles={['owner', 'admin', 'delivery']} />
        ),
        children: [
          {
            path: '',
            element: <MainLayout />,
            children: [
              { path: 'order', element: <Location /> },
              { path: 'menu/:id', element: <UserMenuDetail /> },
              {
                path: 'order_list',
                element: <OrderList />,
              },
              { path: 'cart', element: <Cart /> },
              {
              element: <PaymentGuard />,
              children: [
                {
                  path: "payment",
                  element: <Payment />
                }
              ]
            }
              // { path: 'deli_orders', element: <DeliOrderList /> },
            ],
          },
        ],
      },
      /* dashboard */
      {
        path: '',
        element: <PrivateLayout />,
        children: [
          {
            path: 'dashboard',
            element: (
              <PrivateRoute
                allowedRoles={['owner', 'admin', 'delivery']}
                deniedRoles={['customer']}
              />
            ),
            children: [{ index: true, element: <Dashboard /> }],
          },
          {
            path: 'menus',
            element: <PrivateRoute allowedRoles={['owner']} deniedRoles={['customer']} />,
            children: [{ index: true, element: <Menus /> }],
          },
          {
            path: 'restaurant',
            element: <PrivateRoute allowedRoles={['owner']} deniedRoles={['customer']} />,
            children: [{ index: true, element: <Restaurant /> }],
          },
          {
            path: 'categories',
            element: <PrivateRoute allowedRoles={['owner']} deniedRoles={['customer']} />,
            children: [{ index: true, element: <Category /> }],
          },
          {
            path: 'orders',
            element: <PrivateRoute allowedRoles={['owner','delivery']} deniedRoles={['customer']} />,
            children: [{ index: true, element: <DeliOrderList /> }],
          }, 
          {
            path: 'apply_restaurant',
            element: <PrivateRoute allowedRoles={['delivery']} deniedRoles={['customer']} />,
            children: [{ index: true, element: <ApplyRestaurant /> }],
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
