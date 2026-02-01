import {PageHeader, TextField} from '@/components';
import {useAuth} from '@/hooks/useAuth';
import * as yup from 'yup';
import {Box, Button, HStack, Textarea, VStack} from '@chakra-ui/react';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ROUTES_NESTED} from '@/utils/routes';
import {useNavigate} from 'react-router-dom';
import {showSuccessToast} from '@/utils/errorHandler';
import {useCreateTodoMutation} from '@/store/api/todoApi';

type FormData = {
  title: string;
  description?: string;
};

// Validation schema
const schema: yup.ObjectSchema<FormData> = yup.object({
  title: yup
    .string()
    .required('Task name is required')
    .min(3, 'Task name must be at least 3 characters')
    .max(100, 'Task name cannot exceed 100 characters'),
  description: yup.string().max(500, 'Description cannot exceed 500 characters').optional(),
});

export const Create: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting, isDirty},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: undefined,
    },
  });
  const [createTodo] = useCreateTodoMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await createTodo({...data}).unwrap();

      showSuccessToast('Task created successfully!');
      navigate(ROUTES_NESTED.PROTECTED.TODOS.LIST);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const onDiscard = () => {
    reset();
    navigate(ROUTES_NESTED.PROTECTED.TODOS.LIST);
  };

  return (
    <>
      <PageHeader title={'New task'} goBackVisible />
      <Box maxW="md" mx="auto" mt={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch">
            {/* Task Name Field */}
            <Controller
              name="title"
              control={control}
              render={({field}) => (
                <TextField
                  label="Task name"
                  placeholder="Enter task name"
                  error={errors.title?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({field}) => (
                <Textarea
                  placeholder="Enter task description"
                  rows={4}
                  resize="vertical"
                  {...field}
                />
              )}
            />

            <HStack pt={4}>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={onDiscard}
                disabled={isSubmitting}
                flex={1}
              >
                Discard
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                loadingText="Creating..."
                disabled={!isDirty}
                flex={1}
              >
                Create Task
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </>
  );
};
