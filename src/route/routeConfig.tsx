import PrivateRoute from './PrivateRoute';
import PrivatePageSample from '../pages/PrivatePageSample';
import Home from '../pages/home/Home';
import DashShopowerHome from '../pages/dashboardShopowner/Home';
import Error from '../pages/error/Error';
import MainLayout from '../layout/MainLayout';
import Location from '../pages/order/Location';
import DashboardShopOwner from '../layout/DashboardShopower';
import Categories from '../pages/dashboardShopowner/categories/Categories';
import Menus from '../pages/dashboardShopowner/menus/Menus';
import Extras from '../pages/dashboardShopowner/extras/Extras';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'order', element: <Location /> }, // Assuming this is the correct path for the Location page
      {
        path: 'private',
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [{ index: true, element: <PrivatePageSample /> }],
      },
      { path: '403', element: <Error errorType="403" /> },
      { path: '*', element: <Error errorType="404" /> },
    ],
  },
  {
    path: 'dashboardShopowner',
    element: <DashboardShopOwner />,
    children: [
      {
        index: true,
        element: <DashShopowerHome />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'Menus',
        element: <Menus />,
      },
      {
        path: 'Extras',
        element: <Extras />,
      },
    ],
  },
];
