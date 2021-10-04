import * as React from 'react';

import { Box } from '~/components/ui';
import { Header, Footer } from '~/components/common';

export function Layout({ children }) {
  return (
    <Box css={{ bg: '$sage2' }}>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
}
