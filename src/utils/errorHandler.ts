import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {toaster} from 'src/components/ui/toaster';

interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

export const handleApiError = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) return;

  let errorMessage = 'An unexpected error occurred';

  if ('message' in error) {
    errorMessage = error.message || errorMessage;
  } else if ('status' in error) {
    const status = error.status;

    if (typeof status === 'number') {
      switch (status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access forbidden.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 409:
          errorMessage = 'Conflict. Resource already exists.';
          break;
        case 422:
          errorMessage = 'Validation error. Please check your input.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${status}: Something went wrong.`;
      }
    }

    if (error.data && typeof error.data === 'object') {
      const errorData = error.data as ErrorResponse;
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
    }
  }

  toaster.create({
    title: errorMessage,
    type: 'error',
    closable: true,
    duration: 3000,
  });
};

export const showSuccessToast = (message: string) => {
  toaster.create({
    title: message,
    type: 'success',
    closable: true,
    duration: 3000,
  });
};
