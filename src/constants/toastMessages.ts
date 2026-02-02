export const TOAST_MESSAGES = {
  TODO: {
    DELETED: {
      title: 'Todo deleted',
      description: 'Successfully deleted.',
      type: 'success',
    },
    COMPLETED: {
      title: 'Todo completed',
      description: 'Marked as completed.',
      type: 'success',
    },
    ERROR_DELETE: {
      title: 'Error',
      description: 'Failed to delete todo.',
      type: 'error',
    },
    ERROR_COMPLETE: {
      title: 'Error',
      description: 'Failed to complete todo.',
      type: 'error',
    },
  },
  AUTH: {
    LOGIN_SUCCESS: {
      title: 'Login Successful',
      description: 'You have successfully logged in.',
      type: 'success',
    },
    LOGIN_ERROR: {
      title: 'Login Failed',
      description: 'Please check your credentials.',
      type: 'error',
    },
    REGISTRATION_SUCCESS: {
      title: 'Registration Successful',
      description: 'You can now log in with your credentials.',
      type: 'success',
    },
    REGISTRATION_ERROR: {
      title: 'Registration Failed',
      description: 'Please try again later.',
      type: 'error',
    },
  },
} as const;
