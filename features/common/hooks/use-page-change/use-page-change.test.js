import { renderHook } from '@testing-library/react';
import * as nextRouter from 'next/router';

import { usePageChange } from './use-page-change';

describe('usePageChange', () => {
  let useRouter;
  const newPage = 2;
  const href = '/favourites/2';
  const push = jest.fn();
  window.scrollTo = jest.fn();

  beforeEach(() => {
    useRouter = jest
      .spyOn(nextRouter, 'useRouter')
      .mockReturnValue({ push, asPath: '/favourites/1' });
  });

  afterEach(() => {
    useRouter.mockReset();
  });

  it('should route to given href on handlePageChange', () => {
    const { result } = renderHook(() => usePageChange());

    result.current.handlePageChange(newPage);
    expect(push).toHaveBeenCalledWith(href, null, { shallow: true });
  });

  it('should scroll to top of page after redirect', () => {
    const { result } = renderHook(() => usePageChange());

    result.current.handlePageChange(href);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});
