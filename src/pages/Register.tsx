import {TextField} from '@/components';
import {StyledButton} from '@/components/button';
import {useAuth} from '@/hooks/useAuth';
import {Heading} from '@chakra-ui/react';

const label = 'Register';

export const Register: React.FC = () => {
  const {register, loading} = useAuth();

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
      <TextField label="Password" type="password" />

      {/* TODO: implement onClick */}
      <StyledButton width={{base: '100%', sm: 'auto'}} onClick={handleRegister}>
        {label}
      </StyledButton>
    </div>
  );
};
