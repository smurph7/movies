import * as React from 'react';

import { Box, Text, Flex } from '~/features/ui';
import { useReleaseDates } from '~/features/movies/queries';
import { useBreakpoint } from '~/utils/use-breakpoint';

export function ReleaseDates({ id }) {
  const { data } = useReleaseDates({ id });
  const isMobile = useBreakpoint('bp3');
  const color = isMobile ? 'gray' : 'lightGray';

  if (!data) {
    return <Box css={{ p: '$3' }} />;
  }

  const releaseDate = new Intl.DateTimeFormat('en-AU').format(
    new Date(data.releaseDate)
  );

  return (
    <Flex align="center" gap={1}>
      {data.certification && data.certification !== '' && (
        <Box css={{ border: '1px solid $sage1NoDark', p: '$1' }}>
          <Text color={color} fontSize={2}>
            {data.certification}
          </Text>
        </Box>
      )}
      {data.releaseDate && (
        <Text color={color} fontSize={2}>
          {releaseDate} ({data.region})
        </Text>
      )}
    </Flex>
  );
}
