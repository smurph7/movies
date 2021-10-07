import * as React from 'react';
import NextLink from 'next/link';
import { IoHeartOutline } from 'react-icons/io5';

import { Box, Text, Flex, Button, ThemeChangeButton } from '~/components/ui';
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
        <NextLink href="/">
          <Text aria-label="home" link linkVariant="subtle" heading>
            Movies
          </Text>
        </NextLink>
        <Flex direction="row" align="center" gap={3}>
          <NextLink href="/favourites/1">
            <Button
              aria-label="favourites"
              size={2}
              ghost
              css={{ color: '$sage11' }}
            >
              <IoHeartOutline size={24} />
            </Button>
          </NextLink>
          <ThemeChangeButton />
          <UserHeaderButton />
        </Flex>
      </Flex>
    </Box>
  );
}
