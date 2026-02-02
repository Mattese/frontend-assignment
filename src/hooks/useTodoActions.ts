import {useDeleteTodoMutation, useMarkTodoAsCompletedMutation} from 'src/store/api/todoApi';
import {toaster} from 'src/components/ui/toaster';
import {TOAST_MESSAGES} from 'src/constants/toastMessages';

export const useTodoActions = (id: string) => {
  const [deleteTodo, {isLoading: isDeleting}] = useDeleteTodoMutation();
  const [markTodoAsCompleted, {isLoading: isCompleting}] = useMarkTodoAsCompletedMutation();

  const handleDelete = async () => {
    try {
      await deleteTodo({id}).unwrap();
      toaster.success(TOAST_MESSAGES.TODO.DELETED);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.error(TOAST_MESSAGES.TODO.ERROR_DELETE);
    }
  };

  const handleComplete = async () => {
    try {
      await markTodoAsCompleted({id}).unwrap();
      toaster.success(TOAST_MESSAGES.TODO.COMPLETED);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('Error completing todo:', error);
      toaster.error(TOAST_MESSAGES.TODO.ERROR_COMPLETE);
    }
  };

  return {
    handleDelete,
    handleComplete,
    isDeleting,
    isCompleting,
  };
};
