import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from 'src/hooks/useAuth';
import {ROUTES_NESTED} from 'src/utils/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = ROUTES_NESTED.PUBLIC.LOGIN,
}) => {
  const {isAuthenticated} = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{from: location}} replace />;
  }

  return <>{children}</>;
};
