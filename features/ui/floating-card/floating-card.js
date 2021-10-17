import * as React from 'react';

import { Box } from '~/features/ui/box';

export function FloatingCard({ header, children, ...props }) {
  return (
    <Box
      css={{
        borderRadius: 2,
        boxShadow: 'rgb(0 0 0 / 10%) 0px 5px 10px 0px',
        width: '100%'
      }}
      {...props}
    >
      {header ? (
        <Box
          css={{
            px: 4,
            py: 4,
            borderBottom: '1px solid',
            borderBottomColor: 'gray.100'
          }}
        >
          {header}
        </Box>
      ) : null}
      {children ? <Box css={{ py: 4, px: 4 }}>{children}</Box> : null}
    </Box>
  );
}
