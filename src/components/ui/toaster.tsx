'use client';

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});

// TODO: Fix type error

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} />
    </Portal>
  );
};
