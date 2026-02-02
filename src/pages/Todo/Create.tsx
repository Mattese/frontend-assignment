import {Box} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {PageHeader, TodoForm, TodoFormData} from 'src/components';
import {useCreateTodoMutation} from 'src/store/api/todoApi';
import {showSuccessToast} from 'src/utils/errorHandler';
import {ROUTES_NESTED} from 'src/constants/routes';

export const Create: React.FC = () => {
  const navigate = useNavigate();

  const [createTodo] = useCreateTodoMutation();

  const onSubmit = async (data: TodoFormData) => {
    try {
      await createTodo({...data}).unwrap();

      showSuccessToast('Task created successfully!');
      navigate(ROUTES_NESTED.PROTECTED.TODOS.LIST);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const onDiscard = () => null;

  return (
    <>
      <PageHeader title={'New task'} goBackVisible />
      <Box maxW="md" mx="auto" mt={6}>
        <TodoForm onSubmit={onSubmit} onDiscard={onDiscard} />
      </Box>
    </>
  );
};
