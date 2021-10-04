import * as React from 'react';

import { Box } from '~/components/ui';
import { Header } from '~/components/common';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <Box css={{ bg: '$sage2' }}>{children}</Box>
    </>
  );
}
