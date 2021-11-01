import * as React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import {
  IoHeartOutline,
  IoPersonCircleOutline,
  IoInformationCircleOutline
} from 'react-icons/io5';
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
import { useOnClickOutside } from '~/utils/use-on-click-outside';

export function Header() {
  const { boolean: isMobile, isLoading: isBreakpointLoading } =
    useBreakpoint('bp3');

  return (
    <Flex
      justify="space-between"
      align="center"
      css={{
        p: '$4',
        '@bp5': { px: '$8' },
        position: 'relative'
      }}
    >
      <Box>
        <NextLink href="/">
          <Button
            variant="reset"
            aria-label="home"
            css={{
              '@bp1': { width: 200, height: 48 },
              '@bp4': { width: 250, height: 60 }
            }}
          >
            <NextImage
              src="/logo-full.png"
              alt="logo"
              width={250}
              height={60}
            />
          </Button>
        </NextLink>
      </Box>
      <Flex justify="center" css={{ width: '100%' }}>
        {!isMobile && !isBreakpointLoading && <SearchBar />}
      </Flex>
      <Box>
        <Media lessThan="bp3">
          <MobileHeaderMenu />
        </Media>
        <Media greaterThanOrEqual="bp3">
          <DesktopHeaderMenu />
        </Media>
      </Box>
    </Flex>
  );
}

function IconLink({ href, icon, content }) {
  return (
    <Popover trigger="hover">
      <NextLink href={href}>
        <PopoverTrigger asChild>
          <Button
            aria-label="favourites"
            size={2}
            ghost
            css={{ color: '$sage11' }}
          >
            {icon}
          </Button>
        </PopoverTrigger>
      </NextLink>
      <PopoverContent css={{ bg: '$sage3', padding: '$2' }}>
        <Text color="gray" fontSize={1}>
          {content}
        </Text>
      </PopoverContent>
    </Popover>
  );
}

function MobileDrawerItem({ onSelect, href, icon, content }) {
  const router = useRouter();
  function handleSelect() {
    if (typeof onSelect === 'function') {
      onSelect();
    } else {
      router.push(href);
    }
  }

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={handleSelect} variant="mobile">
        <Flex align="center" gap={2}>
          {icon}
          <Text color="gray">{content}</Text>
        </Flex>
      </DropdownMenuItem>
    </>
  );
}

function DesktopHeaderMenu() {
  return (
    <Flex direction="row" justify="end" align="center" gap={1}>
      <IconLink
        href="/about"
        icon={<IoInformationCircleOutline size={24} />}
        content="About"
      />
      <IconLink
        href="/favourites/1"
        icon={<IoHeartOutline size={24} />}
        content="Favourites"
      />
      <ThemeChangeButton />
      <UserHeaderButton />
    </Flex>
  );
}

function MobileHeaderMenu() {
  const { user } = useUser();
  const { themeText, changeTheme, icon: themeIcon } = useThemeChange();
  const ref = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  useOnClickOutside(ref, React.useCallback(handleClose, []));

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
            p: '$3',
            py: '$5',
            pl: '$6',
            willChange: 'transform'
          }}
        >
          <Flex align="center" ref={ref}>
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
            <MobileDrawerItem
              href="/about"
              icon={<IoInformationCircleOutline size={24} />}
              content="About"
            />
            <MobileDrawerItem
              href="/favourites/1"
              icon={<IoHeartOutline size={24} />}
              content="Favourites"
            />
            <MobileDrawerItem
              onSelect={changeTheme}
              icon={themeIcon}
              content={themeText}
            />
            {user ? (
              <>
                <MobileDrawerItem
                  href="/profile"
                  icon={<IoPersonCircleOutline size={24} />}
                  content="Profile"
                />
                <MobileDrawerItem
                  href="/api/auth/logout"
                  icon={<ExitIcon style={{ width: 24, height: 24 }} />}
                  content="Log out"
                />
              </>
            ) : (
              <MobileDrawerItem
                href="/api/auth/login"
                icon={<IoPersonCircleOutline size={24} />}
                content="Log in"
              />
            )}
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );
}
