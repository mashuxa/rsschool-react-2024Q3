import { ReactNode } from 'react';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
