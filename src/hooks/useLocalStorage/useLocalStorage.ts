import { useCallback, useEffect, useRef } from 'react';

const useLocalStorage = (key: string) => {
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
