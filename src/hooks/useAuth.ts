import {toaster} from 'src/components/ui/toaster';
import {TOAST_MESSAGES} from 'src/constants/toastMessages';
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

      toaster.create(TOAST_MESSAGES.AUTH.LOGIN_SUCCESS);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.create(TOAST_MESSAGES.AUTH.LOGIN_ERROR);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await registerMutation({username, password}).unwrap();

      toaster.create(TOAST_MESSAGES.AUTH.REGISTRATION_SUCCESS);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.create(TOAST_MESSAGES.AUTH.REGISTRATION_ERROR);
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
