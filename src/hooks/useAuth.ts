import {toaster} from 'src/components/ui/toaster';
import {useLoginMutation, useRegisterMutation, useGetUserQuery} from 'src/store/api/authApi';
import {setCredentials} from 'src/store/authSlice';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const {user, token, isAuthenticated} = useAppSelector((state) => state.auth);

  const [loginMutation, {isLoading: loginLoading, error: loginError}] = useLoginMutation();
  const [registerMutation, {isLoading: registerLoading, error: registerError}] =
    useRegisterMutation();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(undefined, {
    skip: !token || !!user,
  });

  const login = async (username: string, password: string) => {
    try {
      const result = await loginMutation({username, password}).unwrap();

      dispatch(
        setCredentials({
          token: result.accessToken,
          refreshToken: result.refreshToken,
        })
      );

      toaster.success({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        type: 'success',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.error({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        type: 'error',
      });
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await registerMutation({username, password}).unwrap();

      toaster.success({
        title: 'Registration Successful',
        description: 'You can now log in with your credentials.',
        type: 'success',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.error({
        title: 'Registration Failed',
        description: 'Please try again later.',
        type: 'error',
      });
    }
  };

  const logout = () => {
    dispatch(
      setCredentials({
        token: null,
        refreshToken: null,
        isAuthenticated: false,
      })
    );
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
