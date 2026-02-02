import {
  type ButtonProps,
  type GroupProps,
  type InputProps,
  type StackProps,
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  mergeRefs,
  useControllableState,
  Field as ChakraField,
} from '@chakra-ui/react';
import * as React from 'react';
import {LuEye, LuEyeOff} from 'react-icons/lu';

// TODO: optimize this component

export interface PasswordVisibilityProps {
  /**
   * The default visibility state of the password input.
   */
  defaultVisible?: boolean;
  /**
   * The controlled visibility state of the password input.
   */
  visible?: boolean;
  /**
   * Callback invoked when the visibility state changes.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Custom icons for the visibility toggle button.
   */
  visibilityIcon?: {on: React.ReactNode; off: React.ReactNode};
}

export interface PasswordInputProps extends InputProps, PasswordVisibilityProps {
  rootProps?: GroupProps;
  errorText?: string;
  label?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = {on: <LuEye />, off: <LuEyeOff />},
      errorText,
      label,
      ...rest
    } = props;

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    });

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <InputGroup
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            onPointerDown={(e) => {
              if (rest.disabled) return;
              if (e.button !== 0) return;
              e.preventDefault();
              setVisible(!visible);
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        {...rootProps}
      >
        <ChakraField.Root invalid={!!errorText && errorText.length > 0}>
          {label && <ChakraField.Label>{label}</ChakraField.Label>}
          <Input {...rest} ref={mergeRefs(ref, inputRef)} type={visible ? 'text' : 'password'} />
          {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
        </ChakraField.Root>
      </InputGroup>
    );
  }
);

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
      <IconButton
        tabIndex={-1}
        ref={ref}
        me="-2"
        aspectRatio="square"
        size="sm"
        variant="ghost"
        height="40px"
        position="absolute"
        right="4px"
        top="33px"
        transform="translateY(-25%)"
        aria-label="Toggle password visibility"
        {...props}
      />
    )
);

interface PasswordStrengthMeterProps extends StackProps {
  max?: number;
  value: number;
}

export const PasswordStrengthMeter = React.forwardRef<HTMLDivElement, PasswordStrengthMeterProps>(
  (props, ref) => {
    const {max = 4, value, ...rest} = props;

    const percent = (value / max) * 100;
    const {label, colorPalette} = getColorPalette(percent);

    return (
      <Stack align="flex-end" gap="1" ref={ref} {...rest}>
        <HStack width="full" {...rest}>
          {Array.from({length: max}).map((_, index) => (
            <Box
              key={index}
              height="1"
              flex="1"
              rounded="sm"
              data-selected={index < value ? '' : undefined}
              layerStyle="fill.subtle"
              colorPalette="gray"
              _selected={{
                colorPalette,
                layerStyle: 'fill.solid',
              }}
            />
          ))}
        </HStack>
        {label && <HStack textStyle="xs">{label}</HStack>}
      </Stack>
    );
  }
);

function getColorPalette(percent: number) {
  switch (true) {
    case percent < 33:
      return {label: 'Low', colorPalette: 'red'};
    case percent < 66:
      return {label: 'Medium', colorPalette: 'orange'};
    default:
      return {label: 'High', colorPalette: 'green'};
  }
}
