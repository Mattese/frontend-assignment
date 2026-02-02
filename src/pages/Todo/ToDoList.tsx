import {PageHeader, EmptyContent} from '@/components';
import {useAuth} from '@/hooks/useAuth';

import {getCurrentDate} from '@/utils/date';
import {
  Box,
  Heading,
  IconButton,
  VStack,
  Text,
  StackSeparator,
  HStack,
  Menu,
  Portal,
} from '@chakra-ui/react';
import * as React from 'react';
import {useMemo} from 'react';
import {MdAdd} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {ROUTES_NESTED} from '@/utils/routes';
import {useGetTodosQuery} from '@/store/api/todoApi';
import {isArray} from '@/utils/typeGuards';
import {Checkmark} from '@chakra-ui/react';
import {BiDotsVerticalRounded} from 'react-icons/bi';

const EMPTY_TITLE = 'You are amazing!';
const EMPTY_DESCRIPTION = 'There is no more task to do.';

interface TodoItemProps {
  title: string;
  completed: boolean;
  description?: string;
}

const TodoItem: React.FC<TodoItemProps> = ({title, completed, description}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="12px 0"
    >
      <Box display="flex" flexDirection="row" alignItems="baseline" gap="12px">
        <Box>
          <Checkmark variant="solid" size="lg" checked={completed} />
        </Box>
        <Box>
          <Heading as="h3">{title}</Heading>
          <Text color="text-tertiary" as="h4" marginTop="12px">
            {description}
          </Text>
        </Box>
      </Box>
      <Box>
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton variant="ghost" aria-label="Task options">
              <BiDotsVerticalRounded />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Content
              bg="bg-secondary"
              borderRadius="8px"
              boxShadow="0px 4px 16px rgba(0, 0, 0, 0.1)"
              padding="8px 0"
              minWidth="160px"
            >
              {/* <Menu.Item
                onSelect={() => {
                  // Handle edit action
                }}
              ><Menu.ItemText
                Edit
              </Menu.ItemText></Menu.Item> */}
              <Menu.Item value="delete">
                <Menu.ItemText>Delete</Menu.ItemText>
              </Menu.Item>
            </Menu.Content>
          </Portal>
        </Menu.Root>
      </Box>
    </Box>
  );
};

export const TodoList: React.FC = () => {
  const {user} = useAuth();
  const {data, isLoading} = useGetTodosQuery();
  const navigate = useNavigate();
  const {todos} = data || {todos: []};

  const subtitle = useMemo(() => getCurrentDate(), []);

  const actions = useMemo(
    () => [
      {
        label: 'Add task',
        onClick: () => navigate(ROUTES_NESTED.PROTECTED.TODOS.CREATE),
        icon: <MdAdd size={20} style={{marginLeft: '8px'}} />,
      },
    ],
    []
  );

  const isTodosEmpty = useMemo(() => !todos || !isArray(todos) || todos.length === 0, [todos]);

  const {incompleteTodos, completedTodos} = useMemo(() => {
    if (isLoading || !isArray(todos)) return {incompleteTodos: [], completedTodos: []};

    return todos.reduce(
      (acc, todo) => {
        if (todo.completed) {
          acc.completedTodos.push(todo);
        } else {
          acc.incompleteTodos.push(todo);
        }
        return acc;
      },
      {incompleteTodos: [], completedTodos: []} as {
        incompleteTodos: typeof todos;
        completedTodos: typeof todos;
      }
    );
  }, [todos, isLoading]);

  return (
    <>
      <PageHeader
        title={user ? `Hello ${user.username}` : 'Hello'}
        subTitle={subtitle}
        actions={actions}
      />
      <Box marginTop="24px">
        {isTodosEmpty ? (
          <EmptyContent title={EMPTY_TITLE} description={EMPTY_DESCRIPTION} />
        ) : (
          <Box divideY="2px">
            <Box>
              {incompleteTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  description={todo.description}
                />
              ))}
            </Box>
            <Box marginTop="24px">
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  description={todo.description}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
