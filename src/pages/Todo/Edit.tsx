import {Box} from '@chakra-ui/react';
import {useNavigate, useParams} from 'react-router-dom';
import {PageHeader} from 'src/components';
import {TodoFormData, TodoForm} from 'src/components/todoForm';
import {useGetTodoQuery, useUpdateTodoMutation} from 'src/store/api/todoApi';
import {showSuccessToast} from 'src/utils/errorHandler';
import {ROUTES_NESTED} from 'src/utils/routes';

export const Edit: React.FC = () => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const [updateTodo] = useUpdateTodoMutation();
  const {data: todo, isLoading} = useGetTodoQuery({id: id ?? ''});

  const onSubmit = async (data: TodoFormData) => {
    if (!id) return;
    try {
      await updateTodo({id, updates: {...data}}).unwrap();

      showSuccessToast('Task updated successfully!');
      navigate(ROUTES_NESTED.PROTECTED.TODOS.LIST);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <>
      <PageHeader title={todo?.title || 'Edit task'} goBackVisible />
      <Box maxW="md" mx="auto" mt={6}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TodoForm
            onSubmit={onSubmit}
            initialTitle={todo?.title || ''}
            initialDescription={todo?.description || ''}
            isEdit={true}
          />
        )}
      </Box>
    </>
  );
};
