import {Box, Flex, Image, Heading} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {Outlet} from 'react-router-dom';

interface UnauthenticatedLayoutProps {
  children?: ReactNode;
}

export function UnauthenticatedLayout({children}: UnauthenticatedLayoutProps) {
  return (
    <Box
      bg="fill-gray"
      minHeight="100vh"
      paddingX="40px"
      paddingY="40px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Flex justifyContent="center" alignItems="center" marginBottom="40px">
        <Box>
          <Flex alignItems="center" gap="12px">
            <Image src="/logo.svg" alt="Logo" height="40px" />
            <Heading as="h1" fontSize="24px" marginTop="8px" color="text-primary">
              Zentask
            </Heading>
          </Flex>
        </Box>
      </Flex>

      <Box
        width={'fit-content'}
        borderRadius={'24px'}
        padding={'40px'}
        gap={'40px'}
        backgroundColor="white"
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
}
