import {Box, Checkmark, Text, Heading, Menu, IconButton, Portal} from '@chakra-ui/react';
import {BiDotsVerticalRounded} from 'react-icons/bi';
import {useNavigate} from 'react-router-dom';
import {createTodoEditRoute} from 'src/constants/routes';
import React from 'react';
import {useTodoActions} from 'src/hooks/useTodoActions';

type TodoItemProps = Readonly<{
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}>;

export const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({title, completed, description, id}) => {
    const navigate = useNavigate();
    const {handleDelete, handleComplete, isDeleting, isCompleting} = useTodoActions(id);

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
          <Box
            cursor="pointer"
            onClick={handleEdit}
            width="100%"
            maxWidth="100%"
            paddingRight="24px"
            overflow="hidden"
          >
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
            <Menu.Trigger asChild>
              <IconButton
                disabled={isDeleting || isCompleting}
                variant="ghost"
                aria-label="Task options"
              >
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
                  <Menu.Item onSelect={handleDelete} value="delete">
                    <Menu.ItemText>Delete</Menu.ItemText>
                  </Menu.Item>
                  {!completed && (
                    <Menu.Item onSelect={handleComplete} value="complete">
                      <Menu.ItemText>Complete</Menu.ItemText>
                    </Menu.Item>
                  )}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </Box>
    );
  }
);
