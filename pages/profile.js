import * as React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { IoPersonCircleOutline } from 'react-icons/io5';

import { Layout, Metadata } from '~/features/common/components';
import { Container, Flex, Box, Text, Button } from '~/features/ui';
import { useProfile } from '~/features/user/queries';

export default function Profile() {
  const profileQuery = useProfile();
  const { data: user } = profileQuery;

  if (!user) {
    // placeholder
    // sign in view
    return null;
  }

  const createdDate = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full',
    timeStyle: 'medium'
  }).format(new Date(user.createdAt));
  return (
    <>
      <Metadata title="Profile" description="View your profile." />
      <Layout>
        <Container
          size={{ '@bp1': 1, '@bp2': 2, '@bp3': 3, '@bp4': 4, '@bp5': 5 }}
          css={{ pt: '$8' }}
        >
          <Flex direction="column" align="center" gap={8}>
            <Flex direction="column" align="center" justify="center" gap={5}>
              <Flex direction="column" align="center" justify="center" gap={3}>
                <Box css={{ color: '$sage10' }}>
                  {user?.picture ? (
                    <NextImage
                      className="profile"
                      src={user.picture}
                      alt="profile-picture"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <IoPersonCircleOutline size={80} />
                  )}
                </Box>
                <Text color="gray"> Hi {user?.name ?? 'there'}!</Text>
              </Flex>
              <Flex direction="column" gap={5}>
                <Flex direction="column" gap={1}>
                  <Text color="gray" fontWeight="bold">
                    Email
                  </Text>
                  <Text color="gray">{user.email}</Text>
                </Flex>
                {user?.nickname && (
                  <Flex direction="column" gap={1}>
                    <Text color="gray" fontWeight="bold">
                      Nickname
                    </Text>
                    <Text color="gray">{user.nickname}</Text>
                  </Flex>
                )}
                <Flex direction="column" gap={1}>
                  <Text color="gray" fontWeight="bold">
                    Account created
                  </Text>
                  <Text color="gray">{createdDate}</Text>
                </Flex>
              </Flex>
            </Flex>
            <NextLink href="/favourites/1">
              <Button size={3} variant="green">
                View Your Favourites
              </Button>
            </NextLink>
          </Flex>
        </Container>
      </Layout>
    </>
  );
}
