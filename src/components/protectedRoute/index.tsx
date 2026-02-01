import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const {user, isAuthenticated} = useAuth();
  const location = useLocation();

  // // if (!isAuthenticated || !user) {
  //   return <Navigate to={redirectTo} state={{from: location}} replace />;
  // }

  return <>{children}</>;
};
