import * as React from 'react';

import { Text, Flex } from '~/components/ui';

export function Footer() {
  return (
    <Flex
      justify="center"
      css={{
        px: '$4',
        pt: '$8',
        pb: '$6'
      }}
    >
      <Text color="gray">Powered by Me</Text>
    </Flex>
  );
}
