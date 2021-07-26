import * as React from 'react';

import { ThemeChangeButton } from '~/components/ui';
import { Header } from '~/components/common';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <ThemeChangeButton />
      {children}
      {/* <Footer /> */}
    </>
  );
}
