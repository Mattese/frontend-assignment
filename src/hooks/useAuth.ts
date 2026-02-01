import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {logoutUser, setCredentials} from '@/store/authSlice';
import {useLoginMutation, useRegisterMutation, useGetUserQuery} from '@/store/api/authApi';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const {user, token, isAuthenticated} = useAppSelector((state) => state.auth);

  const [loginMutation, {isLoading: loginLoading, error: loginError}] = useLoginMutation();
  const [registerMutation, {isLoading: registerLoading, error: registerError}] =
    useRegisterMutation();

  // Only fetch user if we have a token but no user data
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(undefined, {
    skip: !token || !!user,
  });

  const login = async (username: string, password: string) => {
    const result = await loginMutation({username, password}).unwrap();
    dispatch(
      setCredentials({
        token: result.accessToken,
        refreshToken: result.refreshToken,
      })
    );
  };

  const register = async (username: string, password: string) => {
    const result = await registerMutation({username, password}).unwrap();
    dispatch(
      setCredentials({
        token: result.accessToken,
        refreshToken: result.refreshToken,
      })
    );
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    user: user || userData || null,
    loading: loginLoading || registerLoading || userLoading,
    error: loginError || registerError || userError,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
