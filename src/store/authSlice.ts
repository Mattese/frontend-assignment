import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RefreshToken, AccessToken, UserResponse} from './api/types';

type User = UserResponse & {};

interface AuthState {
  user: User | null;
  token: AccessToken | null;
  refreshToken: RefreshToken | null;
  isAuthenticated: boolean;
}

const loadTokenFromStorage = (): string | null => {
  try {
    return localStorage.getItem('accessToken');
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: null,
  token: loadTokenFromStorage(),
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setCredentials: (state, action: PayloadAction<{token: string; refreshToken?: string}>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.token);
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
  },
});

export const {logoutUser, setCredentials} = authSlice.actions;
export default authSlice.reducer;
