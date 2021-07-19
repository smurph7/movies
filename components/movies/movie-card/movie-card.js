import * as React from 'react';

import { Card, Flex, Text } from '~/components/ui';

export function MovieCard({ movie }) {
  return (
    <Card>
      <Flex direction="column" gap={3} css={{ px: '$2', pt: '$2' }}>
        <Text heading truncate fontSize={{ '@bp1': 2, '@bp3': 3 }}>
          {movie.title}
        </Text>
        <Text fontSize={{ '@bp1': 1, '@bp3': 2 }}>{movie.description}</Text>
      </Flex>
    </Card>
  );
}
