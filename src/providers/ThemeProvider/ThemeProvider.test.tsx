import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from './ThemeProvider';
import React, { act, useContext } from 'react';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <span data-testid="current-theme">{theme}</span>
    </div>
  );
};

describe('ThemeProvider', () => {
  const renderComponent = () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should set the initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    renderComponent();

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
  });

  it('should use prefers-color-scheme if no theme in localStorage', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    renderComponent();

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
  });

  it('should toggle the theme', async () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
    renderComponent();

    const button = screen.getByTestId('toggle-theme');
    const currentTheme = screen.getByTestId('current-theme');

    expect(currentTheme.textContent).toBe('light');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(currentTheme.textContent).toBe('dark');
  });

  it('should save the new theme to localStorage', async () => {
    renderComponent();

    const button = screen.getByTestId('toggle-theme');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
