import * as React from 'react';

import { Box, ThemeChangeButton } from '~/components/ui';
import { Header } from '~/components/common';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <ThemeChangeButton />
      <Box css={{ bg: '$sage2' }}>{children}</Box>
      {/* <Footer /> */}
    </>
  );
}
