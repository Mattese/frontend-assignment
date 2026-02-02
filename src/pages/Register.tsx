import {Button, Heading, VStack} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TextField} from 'src/components';
import {PasswordInput} from 'src/components/ui/password-input';
import {useAuth} from 'src/hooks/useAuth';
import {useNavigate} from 'react-router-dom';
import {ROUTES_NESTED} from 'src/constants/routes';

const label = 'Register';

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const RegisterPage: React.FC = () => {
  const {register: authRegister} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authRegister(data.username, data.password);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate(ROUTES_NESTED.PUBLIC.LOGIN);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <VStack gap={4} as="div" width={{base: '200px', sm: '400px'}}>
      <Heading fontWeight="bold" as="h1">
        Register
      </Heading>

      <Heading color="text-tertiary" as="h4">
        Create your account
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
          <PasswordInput
            label="Confirm Password"
            {...register('confirmPassword')}
            errorText={errors.confirmPassword?.message}
          />

          <Button width={{base: '100%', sm: 'auto'}} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : label}
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};
