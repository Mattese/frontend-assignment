import {Box, Skeleton, VStack} from '@chakra-ui/react';

const TodoSkeleton: React.FC = () => (
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    padding="12px 0"
    width="100%"
  >
    <Box display="flex" flexDirection="row" alignItems="baseline" gap={3} flex="1" minWidth="0">
      <Skeleton height="24px" width="24px" borderRadius="4px" />
      <Box flex="1" minWidth="0">
        <Skeleton height="24px" width="60%" mb={2} />
        <Skeleton height="16px" width="80%" />
      </Box>
    </Box>
    <Skeleton height="32px" width="32px" borderRadius="4px" />
  </Box>
);

export const TodoListSkeleton: React.FC<{count?: number}> = ({count = 3}) => (
  <VStack gap={4} width="100%">
    {Array.from({length: count}).map((_, index) => (
      <TodoSkeleton key={index} />
    ))}
  </VStack>
);
