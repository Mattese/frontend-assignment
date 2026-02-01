import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  restrictWhenAuthenticated?: boolean;
}

/**
 * @param restrictWhenAuthenticated - whether to restrict access for authenticated users (default: true)
 * @param redirectTo - where to redirect authenticated users (default: /todos)
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = '/todos',
  restrictWhenAuthenticated = true,
}) => {
  const {user, isAuthenticated} = useAuth();
  const location = useLocation();

  // if (restrictWhenAuthenticated && (isAuthenticated || user)) {
  //   const from = (location.state as any)?.from?.pathname || redirectTo;
  //   return <Navigate to={from} replace />;
  // }

  return <>{children}</>;
};
