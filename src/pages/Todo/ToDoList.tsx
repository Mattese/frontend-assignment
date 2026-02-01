import {PageHeader, EmptyContent} from '@/components';
import {useAuth} from '@/hooks/useAuth';

import {getCurrentDate} from '@/utils/date';
import {Box} from '@chakra-ui/react';
import * as React from 'react';
import {useMemo} from 'react';
import {MdAdd} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {ROUTES_NESTED} from '@/utils/routes';
import {useGetTodosQuery} from '@/store/api/todoApi';
import {isArray} from '@/utils/typeGuards';

const EMPTY_TITLE = 'You are amazing!';
const EMPTY_DESCRIPTION = 'There is no more task to do.';

export const TodoList: React.FC = () => {
  const {user} = useAuth();
  const {data: todos} = useGetTodosQuery();
  const navigate = useNavigate();

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

  const isTodosEmpty = useMemo(() => todos?.length === 0, [todos]);

  const {incompleteTodos, completedTodos} = useMemo(() => {
    if (!isArray(todos)) return {incompleteTodos: [], completedTodos: []};

    return todos.reduce(
      (acc, todo) => {
        if (todo.completed) {
          acc.completedTodos.push(todo);
        } else {
          acc.incompleteTodos.push(todo);
        }
        return acc;
      },
      {incompleteTodos: [] as typeof todos, completedTodos: [] as typeof todos}
    );
  }, [todos]);

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
          <>
            {incompleteTodos.map((todo) => (
              <div key={todo.id}>{todo.title}</div>
            ))}

            {completedTodos.map((todo) => (
              <div key={todo.id}>{todo.title}</div>
            ))}
          </>
        )}
      </Box>
    </>
  );
};
