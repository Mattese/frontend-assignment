import {Field as ChakraField, Input} from '@chakra-ui/react';
import * as React from 'react';

export interface FieldProps extends Omit<ChakraField.RootProps, 'label'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  optionalText?: string;
}

export const TextField = React.forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
  const {label, helperText, errorText, optionalText, ...rest} = props;
  return (
    <ChakraField.Root ref={ref} invalid={!!errorText && errorText.length > 0}>
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      <Input {...rest} />
      {helperText && <ChakraField.HelperText>{helperText}</ChakraField.HelperText>}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});
