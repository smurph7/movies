import * as React from 'react';

import { Container, Flex, Text } from '~/components/ui';

export function HorizontalScroll({ title, children }) {
  return (
    <Container
      size={{ '@bp1': 1, '@bp2': 2, '@bp3': 3, '@bp4': 4, '@bp5': 5 }}
      css={{ width: '100%' }}
    >
      <Flex direction="column" gap={1}>
        <Text heading fontSize={5} css={{ pl: '$1' }}>
          {title}
        </Text>
        <Flex gap={1} css={{ overflowX: 'scroll', pt: '$2', pb: '$5' }}>
          {children}
        </Flex>
      </Flex>
    </Container>
  );
}
