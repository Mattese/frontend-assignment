import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '../store';

// Base query s automatickým připojením access tokenu
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
