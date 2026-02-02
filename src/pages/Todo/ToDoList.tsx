import {Box, Heading, Spinner, VStack} from '@chakra-ui/react';
import * as React from 'react';
import {useMemo} from 'react';
import {MdAdd} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {ROUTES_NESTED} from 'src/utils/routes';
import {useGetTodosQuery} from 'src/store/api/todoApi';
import {isArray} from 'src/utils/typeGuards';
import {getCurrentDate} from 'src/utils/date';
import {useAuth} from 'src/hooks/useAuth';
import {EmptyContent, PageHeader, TodoItem} from 'src/components';

const EMPTY_TITLE = 'You are amazing!';
const EMPTY_DESCRIPTION = 'There is no more task to do.';

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

  const isIncompleteTodosEmpty = useMemo(
    () => !incompleteTodos || incompleteTodos.length === 0,
    [incompleteTodos]
  );

  return (
    <>
      <PageHeader
        title={user ? `Hello ${user.username}` : 'Hello'}
        subTitle={subtitle}
        actions={actions}
      />
      <Box marginTop="24px">
        {isLoading ? (
          <Spinner />
        ) : (
          <VStack gap={4} as="div">
            {isIncompleteTodosEmpty ? (
              <EmptyContent title={EMPTY_TITLE} description={EMPTY_DESCRIPTION} />
            ) : (
              <>
                <Box width="100%">
                  <Heading wordWrap="break-word" fontWeight="semibold" as="h2" size="md">
                    To-do
                  </Heading>
                </Box>
                <Box width="100%" height="1px" bg="gray.300" />
                <Box width="100%">
                  {incompleteTodos.map((todo) => (
                    <TodoItem
                      id={todo.id}
                      key={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      description={todo.description}
                    />
                  ))}
                </Box>
              </>
            )}
            {completedTodos.length > 0 && (
              <>
                <Box width="100%">
                  <Heading wordWrap="break-word" fontWeight="semibold" as="h2" size="md">
                    Completed
                  </Heading>
                </Box>
                <Box width="100%" height="1px" bg="gray.300" />
                <Box marginTop="24px" width="100%">
                  {completedTodos.map((todo) => (
                    <TodoItem
                      id={todo.id}
                      key={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      description={todo.description}
                    />
                  ))}
                </Box>
              </>
            )}
          </VStack>
        )}
      </Box>
    </>
  );
};
