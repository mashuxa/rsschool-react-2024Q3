import { createContext, useState, useCallback, FC } from 'react';
import { Theme, ThemeContextType, ThemeProviderProps } from './types.ts';

const defaultThemeContext: ThemeContextType = { theme: Theme.light, toggleTheme: () => {} };

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      return savedTheme as Theme;
    }

    const matchMediaTheme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;

    localStorage.setItem('theme', matchMediaTheme);

    return matchMediaTheme;
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === Theme.light ? Theme.dark : Theme.light;

      localStorage.setItem('theme', newTheme);

      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
