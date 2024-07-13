import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

type UseLocalStorageReturnType = [MutableRefObject<string>, (value: string) => void];

const useLocalStorage = (key: string): UseLocalStorageReturnType => {
  const value = useRef<string>('');
  const updateLocalStorageValue = useCallback(
    (newValue: string): void => {
      localStorage.setItem(key, newValue);
    },
    [key],
  );

  useEffect(() => {
    value.current = localStorage.getItem(key) || '';
  }, [key]);

  return [value, updateLocalStorageValue];
};

export default useLocalStorage;
