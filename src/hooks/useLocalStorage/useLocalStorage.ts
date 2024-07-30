import { useCallback, useEffect } from "react";

type UseLocalStorageReturnType = (value: string) => void;

const useLocalStorage = (
  key: string,
  onInit: (value: string) => void,
): UseLocalStorageReturnType => {
  const updateLocalStorageValue = useCallback(
    (newValue: string): void => {
      localStorage.setItem(key, newValue);
    },
    [key],
  );

  useEffect(() => {
    onInit(localStorage.getItem(key) || "");
  }, [key, onInit]);

  return updateLocalStorageValue;
};

export default useLocalStorage;
