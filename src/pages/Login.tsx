import {Heading, VStack} from '@chakra-ui/react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {TextField, StyledButton} from 'src/components';
import {PasswordInput} from 'src/components/ui/password-input';
import {useAuth} from 'src/hooks/useAuth';
import {ROUTES_NESTED} from 'src/utils/routes';
import * as yup from 'yup';

const label = 'Login';

interface LoginFormData {
  username: string;
  password: string;
}

const registerSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const Login: React.FC = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);

      setTimeout(() => {
        navigate(ROUTES_NESTED.PROTECTED.TODOS.LIST);
      }, 1500);
    } catch (err) {
      console.error('Login failed:', err);
    }
    // }
  };

  return (
    <VStack gap={4} as="div" width={{base: '200px', sm: '400px'}}>
      <Heading fontWeight="bold" as="h1">
        It’s good to have you back!
      </Heading>

      <Heading color="text-tertiary" as="h4">
        Welcome to our secure portal! To access the full functionality of our app, kindly provide
        your credentials below. Your privacy is our priority.
      </Heading>

      <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
        <VStack width="100%" gap={4}>
          <TextField
            label="Username"
            {...register('username')}
            errorText={errors.username?.message}
          />

          <PasswordInput
            label="Password"
            {...register('password')}
            errorText={errors.password?.message}
          />

          <StyledButton width={{base: '100%', sm: 'auto'}} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : label}
          </StyledButton>
        </VStack>
      </form>
    </VStack>
  );
};
