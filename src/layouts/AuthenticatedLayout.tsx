import {Box, Flex, Image, Heading} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {Outlet} from 'react-router-dom';
import {StyledAvatar} from '../components';

interface AuthenticatedLayoutProps {
  children?: ReactNode;
}

export function AuthenticatedLayout({children}: AuthenticatedLayoutProps) {
  return (
    <Box bg="fill-gray" minHeight="100vh" paddingX="40px" paddingY="40px">
      <Flex justifyContent="space-between" alignItems="center" marginBottom="40px">
        <Box>
          <Flex alignItems="center" gap="12px">
            <Image src="/logo.svg" alt="Logo" height="40px" />
            <Heading as="h1" fontSize="24px" marginTop="8px" color="text-primary">
              Zentask
            </Heading>
          </Flex>
        </Box>

        <Box>
          <StyledAvatar
            rootProps={{
              size: 'md',
            }}
            fallbackProps={{name: 'JD'}}
            imageProps={{
              src: 'https://ui-avatars.com/api/?name=John+Doe&size=24&background=0F62FE&color=fff',
              alt: 'User Avatar',
            }}
          />
        </Box>
      </Flex>

      <Box borderRadius={'24px'} padding={'40px'} gap={'40px'} backgroundColor="white">
        {children || <Outlet />}
      </Box>
    </Box>
  );
}
