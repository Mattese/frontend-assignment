import {Box, Heading} from '@chakra-ui/react';

interface PageHeaderProps {
  title: string;
  subTitle?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({title, subTitle}) => (
  <Box>
    <Heading as="h1" fontSize="24px" marginTop="8px" color="text-primary">
      {title}
    </Heading>
    {subTitle && (
      <Box marginTop="4px" color="text-secondary">
        <Heading as="h4" fontSize="16px">
          {subTitle}
        </Heading>
      </Box>
    )}
  </Box>
);
