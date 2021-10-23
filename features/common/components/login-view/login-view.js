import * as React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Flex, Text, Button } from '~/features/ui';

export function LoginView({
  icon = <IoPersonCircleOutline size={48} />,
  text = 'Please login to view this page.',
  cancelButtonProps
}) {
  const router = useRouter();

  function handleLogin() {
    router.push('/api/auth/login');
  }

  return (
    <Flex direction="column" align="center" gap={5} css={{ p: '$4' }}>
      <Box css={{ color: '$green9' }}>{icon}</Box>
      <Text color="gray" css={{ textAlign: 'center' }}>
        {text}
      </Text>
      <Flex gap={3} align="center">
        {cancelButtonProps && <Button size={2} {...cancelButtonProps} />}
        <Button
          variant="green"
          size={2}
          aria-label="login-to-view-page"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
}
