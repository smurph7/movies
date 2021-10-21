import { renderHook } from '@testing-library/react-hooks';
import * as nextRouter from 'next/router';

import { usePageChange } from './use-page-change';

describe('usePageChange', () => {
  let useRouter;
  const href = '/favourites/2';
  const push = jest.fn();
  window.scrollTo = jest.fn();

  beforeEach(() => {
    useRouter = jest
      .spyOn(nextRouter, 'useRouter')
      .mockImplementation(() => ({ push }));
  });

  afterEach(() => {
    useRouter.mockReset();
  });

  it('should route to given href on handlePageChange', () => {
    const { result, waitFor } = renderHook(() => usePageChange());

    waitFor(() => result.current.handlePageChange(href));
    expect(push).toHaveBeenCalledWith(href, null, { shallow: true });
  });

  it('should scroll to top of page after redirect', () => {
    const { result, waitFor } = renderHook(() => usePageChange());

    waitFor(() => result.current.handlePageChange(href));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});
