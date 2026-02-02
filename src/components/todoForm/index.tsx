import {VStack, Button, Stack, Textarea, Field} from '@chakra-ui/react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {TextField} from '../textField';
import * as yup from 'yup';

export type TodoFormData = {
  title: string;
  description?: string;
};

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  onDiscard?: () => void;
  initialTitle?: string;
  initialDescription?: string;
  isEdit?: boolean;
}

// Validation schema
const schema: yup.ObjectSchema<TodoFormData> = yup.object({
  title: yup
    .string()
    .required('Task name is required')
    .min(3, 'Task name must be at least 3 characters')
    .max(100, 'Task name cannot exceed 100 characters'),
  description: yup.string().max(500, 'Description cannot exceed 500 characters').optional(),
});

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onDiscard,
  initialTitle,
  initialDescription,
  isEdit = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {isSubmitting, isDirty},
  } = useForm<TodoFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialTitle || '',
      description: initialDescription || '',
    },
  });

  const handleDiscard = () => {
    reset();
    onDiscard?.();
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <VStack align="stretch" gap={6}>
        {/* Task Name Field */}
        <Controller
          name="title"
          control={control}
          render={({field}) => <TextField required label="Task name" {...field} />}
        />

        <Controller
          name="description"
          control={control}
          render={({field}) => (
            <Field.Root>
              <Field.Label>Description (Optional)</Field.Label>
              <Textarea size="xl" resize="vertical" {...field} />
            </Field.Root>
          )}
        />

        <Stack pt={4} direction={{base: 'column', sm: 'row'}}>
          <Button
            colorScheme="blue"
            onClick={handleDiscard}
            disabled={isSubmitting || !isDirty}
            flex={1}
          >
            Discard
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            loadingText={isEdit ? 'Updating...' : 'Creating...'}
            disabled={!isDirty || isSubmitting}
            flex={1}
          >
            {isEdit ? 'Update Task' : 'Create Task'}
          </Button>
        </Stack>
      </VStack>
    </form>
  );
};
