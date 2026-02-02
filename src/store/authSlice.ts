import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AccessToken, RefreshToken, UserResponse} from './api/types';
import LOCAL_STORAGE_KEYS from 'src/constants/localStorageKeys';

type User = UserResponse & {};

interface AuthState {
  user: User | null;
  token: AccessToken | null;
  refreshToken: RefreshToken | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

  return {
    user: null,
    token,
    refreshToken,
    isAuthenticated: !!token,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token?: AccessToken | null;
        refreshToken: RefreshToken | null;
        user?: User;
        isAuthenticated?: boolean;
      }>
    ) => {
      const {token, refreshToken, user, isAuthenticated = true} = action.payload;
      if (token) state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = isAuthenticated;

      if (user) state.user = user;

      if (token) localStorage.setItem('accessToken', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const {setCredentials, setUser, logout} = authSlice.actions;
export default authSlice.reducer;
