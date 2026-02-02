import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
  tagTypes: ['Todo', 'User'],
  endpoints: () => ({
    // Example endpoint - you can customize this based on your API
    // getTodos: builder.query<Todo[], void>({
    //   query: () => '/todos',
    //   providesTags: ['Todo'],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = api;
