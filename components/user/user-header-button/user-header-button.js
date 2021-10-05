/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { IoPersonCircleOutline } from 'react-icons/io5';

import {
  Button,
  Flex,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Link
} from '~/components/ui';

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
            <Link href="/profile" variant="blank">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/api/auth/logout" variant="blank">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
