/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { IoPersonCircleOutline } from 'react-icons/io5';

import { Button, Flex } from '~/components/ui';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '~/components/ui/dropdown-menu';

export function UserHeaderButton() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  function handleLogin() {
    if (!user) {
      router.push('/api/auth/login');
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={2}
          css={{ minWidth: 70 }}
          disabled={isLoading}
          onClick={handleLogin}
          aria-label={user ? 'user' : 'login'}
        >
          <Flex align="center" gap={2}>
            {!user && <IoPersonCircleOutline size={20} />}
            {isLoading ? (
              'Welcome'
            ) : user ? (
              <>
                {user?.picture ? (
                  <NextImage
                    className="profile"
                    src={user.picture}
                    alt="profile"
                    width={22}
                    height={22}
                  />
                ) : (
                  <IoPersonCircleOutline size={20} />
                )}

                {user?.name}
              </>
            ) : (
              'Login or Register'
            )}
          </Flex>
        </Button>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent align="center">
          <DropdownMenuGroup>
            <NextLink href="/profile">
              <DropdownMenuItem aria-label="profile">Profile</DropdownMenuItem>
            </NextLink>
            <DropdownMenuSeparator />
            <NextLink href="/api/auth/logout">
              <DropdownMenuItem aria-label="logout">Logout</DropdownMenuItem>
            </NextLink>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
