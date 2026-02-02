import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './api';
import {TodoResponse, CreateTodoBody} from './types';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<{todos: TodoResponse[]}, void>({
      query: () => '/todo/list',
      providesTags: ['Todo'],
    }),

    getTodo: builder.query<TodoResponse, {id: string}>({
      query: ({id}) => `/todo/${id}`,
      providesTags: ['Todo'],
    }),

    createTodo: builder.mutation<TodoResponse, CreateTodoBody>({
      query: (todo) => ({
        url: '/todo',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),

    updateTodo: builder.mutation<TodoResponse, {id: string; updates: CreateTodoBody}>({
      query: ({id, updates}) => ({
        url: `/todo/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Todo'],
    }),

    deleteTodo: builder.mutation<void, {id: string}>({
      query: ({id}) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),

    markTodoAsCompleted: builder.mutation<TodoResponse, {id: string}>({
      query: ({id}) => ({
        url: `/todo/${id}/complete`,
        method: 'POST',
      }),
      invalidatesTags: ['Todo'],
    }),

    markTodoAsIncomplete: builder.mutation<TodoResponse, {id: string}>({
      query: ({id}) => ({
        url: `/todo/${id}/incomplete`,
        method: 'POST',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useMarkTodoAsCompletedMutation,
  useMarkTodoAsIncompleteMutation,
} = todoApi;
