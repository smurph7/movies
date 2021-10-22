import * as React from 'react';
import NextImage from 'next/image';

import { Text, Flex, Link } from '~/features/ui';

export function Footer() {
  return (
    <Flex
      justify="space-around"
      direction={{ '@bp1': 'columnReverse', '@bp2': 'row' }}
      align="center"
      gap={{ '@bp1': 5, '@bp2': 1 }}
      css={{
        px: '$4',
        pt: '$8',
        pb: '$6'
      }}
    >
      <Flex css={{ width: 100 }} />
      <Flex gap={2}>
        <Link href="https://sarahmurphy.dev">
          <Text color="gray">Powered by Me</Text>
        </Link>
        <Text color="gray">|</Text>
        <Link href="https://github.com/smurph7/movies">
          <Text color="gray">View Github</Text>
        </Link>
      </Flex>
      <Flex css={{ justifySelf: 'flex-end' }}>
        <Link href="https://www.themoviedb.org/">
          <NextImage src="/tmdb-logo.svg" width={100} height={43} />
        </Link>
      </Flex>
    </Flex>
  );
}
