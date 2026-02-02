import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type {RootState} from '../store';
import {Mutex} from 'async-mutex';
import {logout, setCredentials} from '../authSlice';

const mutex = new Mutex();
export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api',
  prepareHeaders: (headers, {getState}) => {
    // Získání tokenu z Redux state
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;
        const refreshResult = await baseQueryWithAuth(
          {url: '/refresh-token', method: 'POST', body: {refreshToken}},
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(
            setCredentials({
              token: (refreshResult.data as {accessToken: string}).accessToken,
              refreshToken: (refreshResult.data as {refreshToken: string}).refreshToken,
            })
          );
          // retry the initial query
          result = await baseQueryWithAuth(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQueryWithAuth(args, api, extraOptions);
    }
  }
  return result;
};
