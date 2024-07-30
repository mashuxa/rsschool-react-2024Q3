import { createContext, useState, useCallback, FC, useEffect } from "react";
import { Theme, ThemeContextType, ThemeProviderProps } from "./types";

const defaultThemeContext: ThemeContextType = {
  theme: Theme.light,
  toggleTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.light);
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === Theme.light ? Theme.dark : Theme.light;

      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }

    const matchMediaTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Theme.dark
        : Theme.light;

    localStorage.setItem("theme", matchMediaTheme);

    setTheme(matchMediaTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
