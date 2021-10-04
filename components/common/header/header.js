import * as React from 'react';

import { Box, Text, Flex, Link, ThemeChangeButton } from '~/components/ui';

export function Header() {
  return (
    <Box
      css={{
        p: '$4',
        display: 'flex'
      }}
    >
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        css={{ width: '100%' }}
      >
        <Link href="/">
          <Text heading>Movies</Text>
        </Link>
        <Flex direction="row" align="center" gap={5}>
          <Link href="/">
            <Text>Favourites</Text>
          </Link>
          <Link href="/">
            <Text>Profile</Text>
          </Link>
          <ThemeChangeButton />
        </Flex>
      </Flex>
    </Box>
  );
}
