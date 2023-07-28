import React from 'react';

/*
  Run's an effect on mount, and is cleaned up on unmount. Generally
  useful for interop with non-react plugins or components
*/
export const useMountEffect: typeof React.useEffect = (effect, deps) => {
  const isMounted = React.useRef(false);

  return React.useEffect(() => {
    if (isMounted.current) {
      return effect();
    }
    isMounted.current = true;
  }, [deps, isMounted, effect]);
};
