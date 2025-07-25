import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../store';

export default function RegisterGuard() {
  const { emailSubmitted, otpVerified } = useSelector((state: RootState) => state.auth);

  if (emailSubmitted) {
    return <Navigate to="/verify_mail" replace />;
  }

  if (otpVerified) {
    return <Navigate to="/otp" replace />;
  }

  return <Outlet />;
}
