import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/lib/stores/auth-store';
import { ROUTES } from '@/lib/config';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};