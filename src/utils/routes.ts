export const ROUTES_NESTED = {
  PUBLIC: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PROTECTED: {
    HOME: '/',
    TODOS: {
      LIST: '/todos',
      CREATE: '/todos/create',
      DETAIL: (id: string) => `/todos/${id}`,
      EDIT: (id: string) => `/todos/${id}/edit`,
    },
  },
} as const;

export const createTodoDetailRoute = (id: string) => `/todos/${id}`;
export const createTodoEditRoute = (id: string) => `/todos/${id}/edit`;
