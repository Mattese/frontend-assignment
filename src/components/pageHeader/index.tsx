import {Box, Button, ButtonGroup, Heading, IconButton, Stack} from '@chakra-ui/react';
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
          flexDirection={{base: 'column', sm: 'row'}}
          justifyContent={{sm: 'space-between'}}
          alignItems={{base: 'flex-start', sm: 'center'}}
          gap="16px"
        >
          {goBackVisible && (
            <div>
              <IconButton
                onClick={handleGoBack}
                aria-label="Go back"
                backgroundColor="fill-gray"
                color="fill-darkBlue"
              >
                <MdArrowBack />
              </IconButton>
            </div>
          )}
          <Box>
            <Heading as="h1" fontSize="24px" marginTop="8px" color="text-primary" fontWeight="bold">
              {title}
            </Heading>
            {subTitle && (
              <Heading color="text-tertiary" as="h4" marginTop="4px">
                {subTitle}
              </Heading>
            )}
          </Box>
        </Box>
      </Box>
      {actions && actions.length > 0 && (
        <ButtonGroup direction={{base: 'column', sm: 'row'}} width={{base: '100%', sm: 'auto'}}>
          {actions.map(({label, onClick, icon}, index) => (
            <Button width={{base: '100%', sm: 'auto'}} key={index} onClick={onClick}>
              {label}
              {icon}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </Stack>
  );
};
