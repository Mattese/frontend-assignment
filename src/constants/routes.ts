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
      DETAIL: `/todos/:id`,
      EDIT: `/todos/edit/:id`,
    },
  },
} as const;

export const createTodoDetailRoute = (id: string) => `/todos/${id}`;
export const createTodoEditRoute = (id: string) => `/todos/edit/${id}`;
