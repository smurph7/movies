import '~/styles/global.css';

import { QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserProvider } from '@auth0/nextjs-auth0';
import { IdProvider } from '@radix-ui/react-id';

import { queryClient } from '~/config/query-client';
import { MediaContextProvider } from '~/styles/media';

export default function MyApp({ Component, pageProps }) {
  return (
    <IdProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <MediaContextProvider>
              <Component {...pageProps} />
            </MediaContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </UserProvider>
    </IdProvider>
  );
}
