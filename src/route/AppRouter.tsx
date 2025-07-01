import { useRoutes } from "react-router";
import { routes } from "./routeConfig";

const AppRouter = () => {
  return useRoutes(routes);
};

export default AppRouter;
