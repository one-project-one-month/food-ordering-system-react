import { useRoutes } from 'react-router-dom';
import { routes } from './routeConfig';

const AppRouter = () => {
  return useRoutes(routes);
};

export default AppRouter;
