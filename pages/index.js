import * as React from 'react';

import { Box, Container, Text, Flex, Grid, Card } from '~/components/ui';

export default function Home() {
  return (
    <>
      <Box
        css={{
          bg: '$cream',
          color: '$gray400',
          p: '$4',
          display: 'flex'
        }}
      >
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          css={{ width: '100%' }}
        >
          <Text heading>Movies</Text>
          <Flex direction="row" gap={2}>
            <Text>Favourites</Text>
            <Text>Profile</Text>
          </Flex>
        </Flex>
      </Box>
      <Box css={{ bg: '$background', pt: '$3' }}>
        <Container size={4}>
          <Flex direction="column" gap="$5">
            <Grid columns={{ '@bp3': '5' }} gap={{ '@bp1': 3, '@bp3': 2 }}>
              <Card>
                <Flex direction="column" gap={3} css={{ px: '$2', pt: '$2' }}>
                  <Text heading truncate fontSize={{ '@bp1': 2, '@bp3': 3 }}>
                    Title
                  </Text>
                  <Text fontSize={{ '@bp1': 1, '@bp3': 2 }}>Content</Text>
                </Flex>
              </Card>
            </Grid>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
