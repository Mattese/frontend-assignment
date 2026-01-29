import {Avatar} from '@chakra-ui/react';

interface StyledAvatarProps {
  rootProps: Avatar.RootProps;
  fallbackProps?: Avatar.FallbackProps;
  imageProps: Avatar.ImageProps;
}

export const StyledAvatar: React.FC<StyledAvatarProps> = ({
  rootProps,
  fallbackProps,
  imageProps,
}) => (
  <Avatar.Root {...rootProps}>
    {fallbackProps && <Avatar.Fallback {...fallbackProps} />}
    <Avatar.Image {...imageProps} />
  </Avatar.Root>
);
