import * as React from 'react';
import { IoSadOutline } from 'react-icons/io5';

import { Container, Flex, Box, Text } from '~/features/ui';

export function ErrorMessageView({
  icon = <IoSadOutline size={42} />,
  message = `Sorry, we couldn't find the page you were looking for.`
}) {
  return (
    <Container size={4}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={5}
        css={{ p: '$8', pt: '$10' }}
      >
        <Box css={{ color: '$sage11' }}>{icon}</Box>
        <Text color="gray" css={{ textAlign: 'center' }}>
          {message}
        </Text>
      </Flex>
    </Container>
  );
}
