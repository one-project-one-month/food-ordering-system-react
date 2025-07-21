import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../store';

export default function OtpGuard() {
  const { emailSubmitted } = useSelector((state: RootState) => state.auth);

  if (!emailSubmitted) {
    return <Navigate to="/verify_mail" replace />;
  }

  return <Outlet />;
}
