import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithAuth} from './api';
import {
  RegisterBody,
  RegisterResponse,
  LoginBody,
  LoginResponse,
  UserResponse,
  RefreshTokenBody,
  RefreshTokenResponse,
} from './types';
import {handleApiError} from 'src/utils/errorHandler';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
      query: () => '/user/me',
      providesTags: ['User'],
    }),

    register: builder.mutation<RegisterResponse, RegisterBody>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: (response) => {
        handleApiError(response);
        return response;
      },
      invalidatesTags: ['Auth'],
    }),

    login: builder.mutation<LoginResponse, LoginBody>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenBody>({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {useGetUserQuery, useRegisterMutation, useLoginMutation, useRefreshTokenMutation} =
  authApi;
