import * as React from 'react';
import NextImage from 'next/image';

import { Box, Flex, Text, Card, Placeholder } from '~/features/ui';
import { IMAGE_BASE_URL } from '~/utils/config';

export function CastMemberCard({ castMember, isLoading }) {
  const imageBaseUrl = `${IMAGE_BASE_URL}original`;

  if (isLoading) {
    return (
      <Card>
        <Placeholder width="100%" height="100%" />
      </Card>
    );
  }

  return (
    <Card hasLabel>
      <Box css={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box
          css={{
            height: '100%',
            color: '$contrast',
            position: 'relative'
          }}
        >
          <NextImage
            src={
              castMember?.profilePath
                ? `${imageBaseUrl}${castMember.profilePath}`
                : '/movie-poster-placeholder.svg'
            }
            alt={castMember?.name ?? 'cast-member-placeholder'}
            layout="fill"
            objectFit="cover"
            priority
          />
        </Box>
      </Box>
      <Flex
        direction="column"
        justify="center"
        gap={1}
        css={{
          bg: '$sage1',
          py: '$1',
          px: '$3',
          userSelect: 'auto',
          cursor: 'text',
          minHeight: 50
        }}
      >
        <Text as="h3" heading truncate css={{ fontSize: '$2' }}>
          {castMember?.name}
        </Text>
        <Text fontSize={1} truncate>
          {castMember?.character}
        </Text>
      </Flex>
    </Card>
  );
}
