import { renderHook } from '@testing-library/react';

import { useBreakpoint } from './use-breakpoint';

describe('useBreakpoint', () => {
  it('should return true if size is less than given breakpoint', () => {
    global.innerWidth = 500;
    const { result } = renderHook(() => useBreakpoint('bp3'));

    expect(result.current.boolean).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return false if size is more than given breakpoint', () => {
    global.innerWidth = 500;
    const { result } = renderHook(() => useBreakpoint('bp1'));

    expect(result.current.boolean).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return loading is true if size is undefined', () => {
    global.innerWidth = undefined;
    const { result } = renderHook(() => useBreakpoint('bp1'));

    expect(result.current.isLoading).toBe(true);
  });
});
