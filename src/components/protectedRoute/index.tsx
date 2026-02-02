import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from 'src/hooks/useAuth';
import {ROUTES_NESTED} from 'src/constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * @param restrictWhenAuthenticated - whether to restrict access for authenticated users (default: true)
 * @param redirectTo - where to redirect authenticated users (default: /todos)
 */
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
