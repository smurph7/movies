import * as React from 'react';

import { Box } from '~/features/ui';
import { Header, Footer } from '~/features/common/components';

export function Layout({ children }) {
  return (
    <Box css={{ bg: '$sage2' }}>
      <Header />
      <Box
        css={{
          '@bp1': { minHeight: '50vh' },
          '@bp3': { minHeight: '80vh' }
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
