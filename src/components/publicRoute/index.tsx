import {Navigate} from 'react-router-dom';
import {useAuth} from 'src/hooks/useAuth';
import {ROUTES_NESTED} from 'src/constants/routes';

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
  redirectTo = ROUTES_NESTED.PROTECTED.TODOS.LIST,
  restrictWhenAuthenticated = true,
}) => {
  const {isAuthenticated} = useAuth();
  console.log('PublicRoute - isAuthenticated:', isAuthenticated);
  if (restrictWhenAuthenticated && isAuthenticated) {
    const from = redirectTo;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
