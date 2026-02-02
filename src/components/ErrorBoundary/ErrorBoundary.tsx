import {Component, ErrorInfo, ReactNode} from 'react';
import {Box, Heading, Text, VStack} from '@chakra-ui/react';
import {StyledButton} from '../button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({hasError: false, error: null});
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          padding={4}
        >
          <VStack gap={4} maxWidth="500px" textAlign="center">
            <Heading as="h1" size="2xl">
              Oops! Something went wrong
            </Heading>
            <Text color="text-tertiary">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <StyledButton onClick={this.handleReset}>Go to Homepage</StyledButton>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
