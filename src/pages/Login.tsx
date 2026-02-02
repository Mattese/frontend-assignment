import {Heading} from '@chakra-ui/react';
import {TextField, StyledButton} from 'src/components';
import {PasswordInput, PasswordStrengthMeter} from 'src/components/ui/password-input';
import {useAuth} from 'src/hooks/useAuth';

const label = 'Login';

export const Login: React.FC = () => {
  const {login} = useAuth();
  const handleLogin = async () => {
    // if (username && password) {
    try {
      await login('userName', 'heslo123');
    } catch (err) {
      console.error('Login failed:', err);
    }
    // }
  };

  return (
    <div>
      <Heading fontWeight="bold" as="h1">
        It’s good to have you back!
      </Heading>

      <Heading color="text-tertiary" as="h4">
        Welcome to our secure portal! To access the full functionality of our app, kindly provide
        your credentials below. Your privacy is our priority.
      </Heading>

      <TextField label="Username" />
      <TextField label="Password" />
      <PasswordInput placeholder="Enter password" />
      <PasswordStrengthMeter value={0} />

      {/* TODO: implement onClick */}
      <StyledButton width={{base: '100%', sm: 'auto'}} onClick={handleLogin}>
        {label}
      </StyledButton>
    </div>
  );
};
