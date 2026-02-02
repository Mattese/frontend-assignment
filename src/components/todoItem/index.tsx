import {Box, Checkmark, Text, Heading, Menu, IconButton, Portal} from '@chakra-ui/react';
import {BiDotsVerticalRounded} from 'react-icons/bi';
import {useDeleteTodoMutation, useMarkTodoAsCompletedMutation} from 'src/store/api/todoApi';
import {toaster} from '../ui/toaster';
import {useNavigate} from 'react-router-dom';
import {createTodoEditRoute} from 'src/utils/routes';

type TodoItemProps = Readonly<{
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}>;

export const TodoItem: React.FC<TodoItemProps> = ({title, completed, description, id}) => {
  const navigate = useNavigate();
  const [deleteTodo] = useDeleteTodoMutation();
  const [markTodoAsCompleted] = useMarkTodoAsCompletedMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({id});
      toaster.success({
        title: 'Todo deleted',
        description: 'The todo item has been successfully deleted.',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.error({
        title: 'Error deleting todo',
        description: 'There was an error deleting the todo item. Please try again.',
      });
    }
  };
  const handleComplete = async (id: string) => {
    try {
      await markTodoAsCompleted({id});
      toaster.success({
        title: 'Todo completed',
        description: 'The todo item has been marked as completed.',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toaster.error({
        title: 'Error completing todo',
        description: 'There was an error marking the todo item as completed. Please try again.',
      });
    }
  };

  const handleEdit = () => {
    navigate(createTodoEditRoute(id));
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="12px 0"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="baseline"
        gap="12px"
        flex="1"
        minWidth="0"
        overflow="hidden"
      >
        <Box>
          <Checkmark variant="solid" size="lg" checked={completed} />
        </Box>
        <Box maxWidth="100%" paddingRight="24px" overflow="hidden">
          <Heading
            wordWrap="break-word"
            textOverflow="clip"
            overflowWrap="break-word"
            fontWeight="bold"
            as="h3"
          >
            {title}
          </Heading>
          <Text
            wordWrap="break-word"
            overflowWrap="break-word"
            color="text-tertiary"
            as="h4"
            marginTop="12px"
            textOverflow="clip"
          >
            {description}
          </Text>
        </Box>
      </Box>
      <Box>
        <Menu.Root>
          <Menu.Trigger>
            <IconButton variant="ghost" aria-label="Task options">
              <BiDotsVerticalRounded />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                bg="bg-secondary"
                borderRadius="8px"
                boxShadow="0px 4px 16px rgba(0, 0, 0, 0.1)"
                padding="8px 0"
                minWidth="160px"
              >
                <Menu.Item value="edit" onSelect={handleEdit}>
                  <Menu.ItemText>Edit</Menu.ItemText>
                </Menu.Item>
                <Menu.Item onSelect={() => handleDelete(id)} value="delete">
                  <Menu.ItemText>Delete</Menu.ItemText>
                </Menu.Item>
                <Menu.Item onSelect={() => handleComplete(id)} value="complete">
                  <Menu.ItemText>Complete</Menu.ItemText>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </Box>
  );
};
