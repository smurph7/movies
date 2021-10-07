import * as React from 'react';
import NextLink from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { IoHeartOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { ExitIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import {
  Box,
  Text,
  Flex,
  Button,
  ThemeChangeButton,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '~/components/ui';
import { UserHeaderButton } from '~/components/user';
import { useThemeChange } from '~/components/ui/theme-change-button/hooks';
import { Media } from '~/styles/media';

export function Header() {
  return (
    <Box
      css={{
        p: '$4',
        '@bp1': { px: '$6' },
        '@bp3': { px: '$8' },
        display: 'flex',
        position: 'relative'
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
        <Media lessThan="bp3">
          <MobileHeaderMenu />
        </Media>
        <Media greaterThanOrEqual="bp3">
          <DesktopHeaderMenu />
        </Media>
      </Flex>
    </Box>
  );
}

function DesktopHeaderMenu() {
  return (
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
  );
}

function MobileHeaderMenu() {
  const { user } = useUser();
  const { theme, changeTheme, icon } = useThemeChange();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={2} css={{ color: '$sage11' }}>
          <HamburgerMenuIcon style={{ width: 24, height: 24 }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" variant="mobile">
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="mobile" onClick={changeTheme}>
            <Flex align="center" gap={2}>
              {icon}
              <Text color="gray">
                {theme === 'theme-default' ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </Flex>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <NextLink href="/favourites/1">
            <DropdownMenuItem variant="mobile">
              <Flex align="center" gap={2}>
                <IoHeartOutline size={24} />
                <Text color="gray">Favourites</Text>
              </Flex>
            </DropdownMenuItem>
          </NextLink>
          <DropdownMenuSeparator />
          {user ? (
            <>
              <NextLink href="/profile">
                <DropdownMenuItem variant="mobile">
                  <Flex align="center" gap={2}>
                    <IoPersonCircleOutline size={24} />
                    <Text color="gray">Profile</Text>
                  </Flex>
                </DropdownMenuItem>
              </NextLink>
              <DropdownMenuSeparator />
              <NextLink href="/api/auth/logout">
                <DropdownMenuItem variant="mobile">
                  <Flex align="center" gap={2}>
                    <ExitIcon style={{ width: 24, height: 24 }} />
                    <Text color="gray">Log out</Text>
                  </Flex>
                </DropdownMenuItem>
              </NextLink>
            </>
          ) : (
            <NextLink href="/api/auth/login">
              <DropdownMenuItem variant="mobile">
                <Flex align="center" gap={2}>
                  <IoPersonCircleOutline size={24} />
                  <Text color="gray">Log in</Text>
                </Flex>
              </DropdownMenuItem>
            </NextLink>
          )}
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
