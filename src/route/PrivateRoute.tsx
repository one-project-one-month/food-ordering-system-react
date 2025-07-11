// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
  allowedRoles?: string[];
  deniedRoles?: string[];
}

const PrivateRoute = ({
  allowedRoles = [],
  deniedRoles = [],
}: PrivateRouteProps) => {
  const userRole = (Cookies.get('role') || 'user').toLowerCase();

  const isDenied = deniedRoles.map(r => r.toLowerCase()).includes(userRole);
  const isAllowed =
    allowedRoles.length === 0 || allowedRoles.map(r => r.toLowerCase()).includes(userRole);

  if (isDenied) return <Navigate to="/403" replace />;
  if (!isAllowed) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
