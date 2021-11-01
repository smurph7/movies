import * as React from 'react';

import { StyledCarousel, Flex, Text } from '~/features/ui';
import { useCast } from '~/features/movies/queries';
import { CastMemberCard } from '~/features/movies/components';

export function Cast({ id }) {
  const castQuery = useCast({ id });

  if (!castQuery.data || castQuery.data?.length === 0) {
    return null;
  }

  return (
    <Flex direction="column" gap={3}>
      <Text as="h2" heading>
        Top Billed Cast
      </Text>
      <StyledCarousel pb="$5">
        {castQuery.data?.map((castMember, index) => (
          <CastMemberCard
            key={`${castMember?.id}-${index}`}
            castMember={castMember}
            isLoading={castQuery.isLoading || castQuery.isIdle}
          />
        ))}
      </StyledCarousel>
    </Flex>
  );
}
