import * as React from 'react';
import NextLink from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { IoHeartOutline, IoPersonCircleOutline } from 'react-icons/io5';
import {
  Cross1Icon,
  ExitIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons';

import { SearchBar } from '../search';

import { Box, Text, Flex, Button, ThemeChangeButton } from '~/features/ui';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '~/features/ui/dropdown-menu';
import { Popover, PopoverTrigger, PopoverContent } from '~/features/ui/popover';
import { UserHeaderButton } from '~/features/user/components';
import { useThemeChange } from '~/features/ui/theme-change-button/hooks';
import { Media } from '~/styles/media';
import { useBreakpoint } from '~/utils/use-breakpoint';

export function Header() {
  const isMobile = useBreakpoint('bp3');
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
        justify="space-between"
        direction="row"
        align="center"
        gap={5}
        css={{ width: '100%' }}
      >
        <NextLink href="/">
          <Text aria-label="home" link linkVariant="subtle" heading>
            Movies
          </Text>
        </NextLink>
        {!isMobile && (
          <Flex
            justify="space-around"
            align="center"
            css={{ px: '$4', width: '80%' }}
          >
            <SearchBar />
          </Flex>
        )}
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
      <Popover trigger="hover">
        <NextLink href="/favourites/1">
          <PopoverTrigger asChild>
            <Button
              aria-label="favourites"
              size={2}
              ghost
              css={{ color: '$sage11' }}
            >
              <IoHeartOutline size={24} />
            </Button>
          </PopoverTrigger>
        </NextLink>
        <PopoverContent css={{ bg: '$sage3', padding: '$2' }}>
          <Text color="gray" fontSize={1}>
            Favourites
          </Text>
        </PopoverContent>
      </Popover>
      <ThemeChangeButton />
      <UserHeaderButton />
    </Flex>
  );
}

function MobileHeaderMenu() {
  const { user } = useUser();
  const { themeText, changeTheme, icon } = useThemeChange();
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Flex align="center">
      {isOpen ? (
        <Box
          css={{
            top: 0,
            left: 0,
            position: 'absolute',
            zIndex: 20,
            bg: '$sage1',
            width: '100%',
            p: '$3'
          }}
        >
          <Flex align="center">
            <SearchBar />
            <Button ghost css={{ color: '$sage11' }} onClick={handleClose}>
              <Cross1Icon />
            </Button>
          </Flex>
        </Box>
      ) : (
        <Button ghost css={{ color: '$sage11' }} onClick={handleOpen}>
          <MagnifyingGlassIcon style={{ width: 30, height: 30 }} />
        </Button>
      )}
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
                <Text color="gray">{themeText}</Text>
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
    </Flex>
  );
}
