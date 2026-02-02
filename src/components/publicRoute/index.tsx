import {Navigate} from 'react-router-dom';
import {useAuth} from 'src/hooks/useAuth';
import {ROUTES_NESTED} from 'src/constants/routes';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  restrictWhenAuthenticated?: boolean;
}

/**
 * @param redirectTo - where to redirect unauthenticated users (default: /todos)
 * @param restrictWhenAuthenticated - whether to restrict access for authenticated users (default: true)
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = ROUTES_NESTED.PROTECTED.TODOS.LIST,
  restrictWhenAuthenticated = true,
}) => {
  const {isAuthenticated} = useAuth();

  if (restrictWhenAuthenticated && isAuthenticated) {
    const from = redirectTo;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
