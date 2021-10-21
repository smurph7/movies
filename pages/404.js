import * as React from 'react';
import { IoSadOutline } from 'react-icons/io5';

import { Layout } from '~/features/common/components';
import { Container, Flex, Box, Text } from '~/features/ui';

export default function Custom404Page() {
  return (
    <Layout>
      <Container size={4}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={5}
          css={{ p: '$8', pt: '$10' }}
        >
          <Box css={{ color: '$sage11' }}>
            <IoSadOutline size={42} />
          </Box>
          <Text color="gray">
            Sorry, we couldn't find the page you were looking for.
          </Text>
        </Flex>
      </Container>
    </Layout>
  );
}
