/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { IoPersonCircleOutline } from 'react-icons/io5';

import { Button, Flex } from '~/components/ui';

export function UserHeaderButton() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  function handleClick() {
    if (!user) {
      router.push('/api/auth/login');
    } else {
      router.push('/profile');
    }
  }

  return (
    <Button
      size={2}
      css={{ minWidth: 70 }}
      disabled={isLoading}
      onClick={handleClick}
    >
      <Flex align="center" gap={2}>
        {!user && <IoPersonCircleOutline size={20} />}
        {isLoading ? (
          'Welcome'
        ) : user ? (
          <>
            <NextImage
              className="profile"
              src={user?.picture ?? '/'}
              alt="profile"
              width={22}
              height={22}
            />
            {user?.name}
          </>
        ) : (
          'Login or Register'
        )}
      </Flex>
    </Button>
  );
}
