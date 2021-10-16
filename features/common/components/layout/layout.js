import * as React from 'react';

import { Box } from '~/features/ui';
import { Header, Footer } from '~/features/common/components';

export function Layout({ children }) {
  return (
    <Box css={{ bg: '$sage2' }}>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
}
