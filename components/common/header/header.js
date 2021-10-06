import * as React from 'react';

import { Box, Text, Flex, Link, ThemeChangeButton } from '~/components/ui';
import { UserHeaderButton } from '~/components/user';

export function Header() {
  return (
    <Box
      css={{
        p: '$4',
        px: '$8',
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
          <Link href="/favourites/1">
            <Text>Favourites</Text>
          </Link>
          <ThemeChangeButton />
          <UserHeaderButton />
        </Flex>
      </Flex>
    </Box>
  );
}
