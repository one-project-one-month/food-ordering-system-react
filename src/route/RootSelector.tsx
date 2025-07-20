import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RootSelector = () => {
  const role = Cookies.get('role')?.toLowerCase();

  if (['owner', 'admin', 'delivery'].includes(role ?? '')) {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === 'customer') {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/403" replace />;
};

export default RootSelector;
