import {Box, ButtonGroup, Heading, IconButton, Stack} from '@chakra-ui/react';
import {StyledButton} from '../button';
import {MdArrowBack} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subTitle?: React.ReactNode;
  goBackVisible?: boolean;
  actions?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subTitle,
  goBackVisible = false,
  actions,
}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Stack
      direction={{base: 'column', sm: 'row'}}
      align={{base: 'stretch', sm: 'center'}}
      justify={{base: 'flex-start', sm: 'space-between'}}
      gap="16px"
      marginBottom="16px"
    >
      <Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap="16px"
        >
          {goBackVisible && (
            <IconButton
              onClick={handleGoBack}
              aria-label="Go back"
              backgroundColor="fill-gray"
              color="fill-darkBlue"
            >
              <MdArrowBack />
            </IconButton>
          )}
          <Box>
            <Heading as="h1" fontSize="24px" marginTop="8px" color="text-primary" fontWeight="bold">
              {title}
            </Heading>{' '}
            {subTitle && (
              <Heading color="text-tertiary" as="h4" marginTop="4px">
                {subTitle}
              </Heading>
            )}
          </Box>
        </Box>
      </Box>
      {actions && actions.length > 0 && (
        <ButtonGroup width={{base: '100%', sm: 'auto'}} flexDirection={{base: 'column', md: 'row'}}>
          {actions.map(({label, onClick, icon}, index) => (
            <StyledButton width={{base: '100%', sm: 'auto'}} key={index} onClick={onClick}>
              {label}
              {icon}
            </StyledButton>
          ))}
        </ButtonGroup>
      )}
    </Stack>
  );
};
