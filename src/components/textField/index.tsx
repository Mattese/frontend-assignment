import {Field as ChakraField, Input} from '@chakra-ui/react';
import * as React from 'react';

export interface FieldProps extends Omit<ChakraField.RootProps, 'label'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  optionalText?: string;
}

export const TextField = React.forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
  const {label, helperText, errorText, optionalText, required, ...rest} = props;
  return (
    <ChakraField.Root required={required} ref={ref} invalid={!!errorText && errorText.length > 0}>
      {label && (
        <ChakraField.Label>
          <ChakraField.RequiredIndicator fallback={optionalText} />
          {label}
        </ChakraField.Label>
      )}
      <Input {...rest} />
      {helperText && <ChakraField.HelperText>{helperText}</ChakraField.HelperText>}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});
