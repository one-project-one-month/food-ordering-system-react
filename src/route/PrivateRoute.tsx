import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const PrivateRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const userRole = Cookies.get("role") || "";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/403" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
