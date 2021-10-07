/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IdProvider } from '@radix-ui/react-id';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

function AllTheProviders({ children }) {
  return (
    <IdProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IdProvider>
  );
}

function customRender(ui, options) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
