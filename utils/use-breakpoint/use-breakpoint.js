import * as React from 'react';

import { breakpoints } from '../config';

function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// The useBreakpoint hook will return true if breakpointVal if it is under the
// breakpoint in the theme breakpoints array.
export function useBreakpoint(breakpointVal) {
  const breakpoint = breakpoints[breakpointVal];
  const size = useWindowSize();
  return {
    isLoading: size.width === undefined,
    boolean: size.width < breakpoint
  };
}
