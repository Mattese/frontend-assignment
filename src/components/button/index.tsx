import {Button, ButtonProps} from '@chakra-ui/react';

export const StyledButton: React.FC<ButtonProps> = ({children, ...props}) => (
  <Button colorScheme="teal" size="md" {...props}>
    {children}
  </Button>
);
