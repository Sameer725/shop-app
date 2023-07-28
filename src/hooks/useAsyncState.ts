import React, { useCallback, useEffect, useRef, useState } from 'react';

type SetStateAction<T> = React.SetStateAction<T> | T;
export type SetAsyncState<T> = (value: SetStateAction<T>) => Promise<T>;

export const useAsyncState = <T>(initialState: T): [T, SetAsyncState<T>] => {
  const [state, setState] = useState(initialState);
  const resolveState = useRef<(state: T) => void>();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (resolveState.current) {
      resolveState.current(state);
    }
  }, [state]);

  const setAsyncState = useCallback(
    async (newState: SetStateAction<T> | T) =>
      new Promise<T>((resolve) => {
        if (isMounted.current) {
          resolveState.current = resolve;
          setState(newState);
        }
      }),
    []
  );

  return [state, setAsyncState];
};
