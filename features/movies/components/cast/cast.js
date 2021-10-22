import * as React from 'react';

import { StyledCarousel, Flex, Text } from '~/features/ui';
import { useCast } from '~/features/movies/queries';

export function Cast({ id }) {
  const castQuery = useCast({ id });

  return (
    <Flex direction="column" gap={3}>
      <Text heading>Top Billed Cast</Text>
      <StyledCarousel>
        {castQuery.data?.map((castMember, index) => (
          <Text>{castMember.name}</Text>
        ))}
      </StyledCarousel>
    </Flex>
  );
}
