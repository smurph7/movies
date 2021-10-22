import * as React from 'react';

import { Text, Flex, Link } from '~/features/ui';

export function Footer() {
  return (
    <Flex
      justify="center"
      gap={2}
      css={{
        px: '$4',
        pt: '$8',
        pb: '$6'
      }}
    >
      <Link href="https://sarahmurphy.dev">
        <Text color="gray">Powered by Me</Text>
      </Link>
      <Text color="gray">|</Text>
      <Link href="https://github.com/smurph7/movies">
        <Text color="gray">View Github</Text>
      </Link>
    </Flex>
  );
}
