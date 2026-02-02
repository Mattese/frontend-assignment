import {Heading} from '@chakra-ui/react';
import {TextField, StyledButton} from 'src/components';
import {useAuth} from 'src/hooks/useAuth';

const label = 'Register';

export const Register: React.FC = () => {
  const {register} = useAuth();

  const handleRegister = async () => {
    // if (username && password) {
    try {
      await register('userName', 'heslo123');
    } catch (err) {
      console.error('Registration failed:', err);
    }
    // }
  };
  return (
    <div>
      <Heading fontWeight="bold" as="h1">
        Register
      </Heading>

      <Heading color="text-tertiary" as="h4">
        Create your account
      </Heading>

      <TextField label="Username" />
      <TextField label="Password" />

      {/* TODO: implement onClick */}
      <StyledButton width={{base: '100%', sm: 'auto'}} onClick={handleRegister}>
        {label}
      </StyledButton>
    </div>
  );
};
