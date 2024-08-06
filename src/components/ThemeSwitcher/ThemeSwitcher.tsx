import React, { useContext } from 'react';
import { ThemeContext } from 'src/providers/ThemeProvider/ThemeProvider.tsx';
import { Theme, ThemeContextType } from 'src/providers/ThemeProvider/types.ts';

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useContext<ThemeContextType>(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center p-2 ml-auto rounded-full border-2  ${
        theme === Theme.light
          ? 'text-slate-700 bg-gray-200 border-gray-400'
          : 'text-slate-100 bg-gray-600 border-gray-800'
      }`}
    >
      {theme === Theme.light ? 'Light' : 'Dark'} {theme === Theme.light ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeSwitch;
