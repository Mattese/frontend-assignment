import {Box} from '@chakra-ui/react';
import * as React from 'react';
import {useMemo} from 'react';
import {EmptyContent, PageHeader} from 'src/components';
import {getCurrentDate} from 'src/utils/date';

export const TodoList: React.FC = () => {
  //TODO: change hardcoded name to logged in user's name
  const name = 'Anne';

  // TODD: CHange date format to 20.listopadu 2024
  const subtitle = useMemo(() => getCurrentDate(), []);
  // TODO: fetch todos from backend and specify correct type
  const todos: string[] = [];

  return (
    <>
      <PageHeader title={`Hello ${name}`} subTitle={subtitle} />
      <Box marginTop="24px">{todos.length === 0 && <EmptyContent />}</Box>
    </>
  );
};
