import {Box, Heading, VStack} from '@chakra-ui/react';
import * as React from 'react';
import {useMemo} from 'react';
import {MdAdd} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {ROUTES_NESTED} from 'src/constants/routes';
import {useGetTodosQuery} from 'src/store/api/todoApi';
import {isArray} from 'src/utils/typeGuards';
import {getCurrentDate} from 'src/utils/date';
import {useAuth} from 'src/hooks/useAuth';
import {EmptyContent, PageHeader, TodoItem} from 'src/components';
import {TodoListSkeleton} from 'src/components/TodoSkeleton/TodoSkeleton';
import {TodoResponse} from 'src/store/api/types';

const EMPTY_TITLE = 'You are amazing!';
const EMPTY_DESCRIPTION = 'There is no more task to do.';

const TodoSection: React.FC<{
  title: string;
  todos: Array<TodoResponse>;
}> = ({title, todos}) => (
  <>
    <Box width="100%">
      <Heading fontWeight="semibold" as="h2" size="md">
        {title}
      </Heading>
    </Box>
    <Box width="100%" height="1px" bg="gray.300" />
    <Box width="100%">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </Box>
  </>
);

export const ToDoListPage: React.FC = () => {
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
    [navigate]
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
      <Box mt={6}>
        {isLoading ? (
          <TodoListSkeleton count={5} />
        ) : (
          <VStack gap={6} as="div">
            {isIncompleteTodosEmpty ? (
              <EmptyContent title={EMPTY_TITLE} description={EMPTY_DESCRIPTION} />
            ) : (
              incompleteTodos.length > 0 && <TodoSection title="To-do" todos={incompleteTodos} />
            )}
            {completedTodos.length > 0 && <TodoSection title="Completed" todos={completedTodos} />}
          </VStack>
        )}
      </Box>
    </>
  );
};
