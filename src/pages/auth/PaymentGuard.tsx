import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../store';

export default function PaymentGuard() {
  const { canAccessPayment } = useSelector((state: RootState) => state.order);

  if (!canAccessPayment) {
    return <Navigate to="/cart" replace />;
  }

  return <Outlet />;
}
