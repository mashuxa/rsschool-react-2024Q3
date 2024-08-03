"use client";

import { FC, ReactNode } from "react";
import { store } from "src/store/store";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
