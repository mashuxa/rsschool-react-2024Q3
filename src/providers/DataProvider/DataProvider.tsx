import { createContext, ReactNode } from "react";
import { FetchDataType, Person } from "src/types";

interface ContextType {
  persons: FetchDataType<Person>;
  details: Partial<Person>;
}

interface CommonDataProviderProps extends ContextType {
  children: ReactNode;
}

const defaultValue = {
  details: {},
  persons: {
    count: 0,
    results: [],
  },
};

export const DataContext = createContext<ContextType>(defaultValue);

export const DataProvider = ({
  children,
  persons,
  details,
}: CommonDataProviderProps) => {
  return (
    <DataContext.Provider value={{ persons, details }}>
      {children}
    </DataContext.Provider>
  );
};
