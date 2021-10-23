import * as React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { IoPersonCircleOutline } from 'react-icons/io5';

import { Layout, LoginView, Metadata } from '~/features/common/components';
import { Container, Flex, Box, Text, Button, Placeholder } from '~/features/ui';
import { useProfile } from '~/features/user/queries';

export default function Profile() {
  const profileQuery = useProfile();
  const { data: user, isLoading } = profileQuery;

  const createdDate = user?.createdAt
    ? new Intl.DateTimeFormat('en-AU', {
        dateStyle: 'full',
        timeStyle: 'medium'
      }).format(new Date(user.createdAt))
    : '';

  return (
    <>
      <Metadata title="Profile" description="View your profile." />
      <Layout>
        <Container
          size={{ '@bp1': 1, '@bp2': 2, '@bp3': 3, '@bp4': 4, '@bp5': 5 }}
          css={{ pt: '$8' }}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {isLoading ? (
            <LoadingPlaceholder />
          ) : !user ? (
            <LoginView />
          ) : (
            <Flex direction="column" align="center" gap={8}>
              <Flex direction="column" align="center" justify="center" gap={5}>
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap={3}
                >
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
                  <Flex direction="column" gap={1}>
                    <Text color="gray" fontWeight="bold">
                      Theme Preference
                    </Text>
                    <Text color="gray">
                      {/* // TODO make switch */}
                      {user?.userMetadata?.themePreference}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <NextLink href="/favourites/1">
                <Button size={3} variant="green">
                  View Your Favourites
                </Button>
              </NextLink>
            </Flex>
          )}
        </Container>
      </Layout>
    </>
  );
}

function LoadingPlaceholder() {
  return (
    <Flex direction="column" align="center" gap={8}>
      <Flex direction="column" align="center" justify="center" gap={5}>
        <Flex direction="column" align="center" justify="center" gap={3}>
          <Placeholder width={80} height={80} borderRadius="$round" />
          <Placeholder width={130} height={16} />
        </Flex>
        <Flex direction="column" gap={5}>
          <Flex direction="column" gap={1}>
            <Placeholder width={100} height={16} />
            <Placeholder width={250} height={16} />
          </Flex>
          <Flex direction="column" gap={1}>
            <Placeholder width={100} height={16} />
            <Placeholder width={250} height={16} />
          </Flex>
          <Flex direction="column" gap={1}>
            <Placeholder width={100} height={16} />
            <Placeholder width={250} height={16} />
          </Flex>
        </Flex>
      </Flex>
      <Button size={3} disabled>
        View Your Favourites
      </Button>
    </Flex>
  );
}
