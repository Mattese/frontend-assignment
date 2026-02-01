import {Heading, Image, Center, Text} from '@chakra-ui/react';

interface EmptyContentProps {
  title?: string;
  description?: string;
}

export const EmptyContent: React.FC<EmptyContentProps> = ({title, description}) => (
  <Center flexDirection="column" gap="16px" padding="40px">
    <Image src="/Pictogram.svg" alt="No content" marginBottom="16px" />
    {title && (
      <Heading as="h2" fontWeight="bold">
        {title}
      </Heading>
    )}
    {description && <Text color="text-tertiary">{description}</Text>}
  </Center>
);
