import * as React from 'react';

import { DarkThemeButton } from '~/components/ui';
import { Header } from '~/components/common';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <DarkThemeButton />
      {children}
      {/* <Footer /> */}
    </>
  );
}
