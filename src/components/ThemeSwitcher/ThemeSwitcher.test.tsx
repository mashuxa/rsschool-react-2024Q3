import { fireEvent, render, screen } from "@testing-library/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { ThemeProvider } from "src/providers/ThemeProvider/ThemeProvider";
import { act } from "react";

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );
  });

  test("should render correctly", () => {
    const btn = screen.getByTestId("theme-switch");

    expect(btn).toBeInTheDocument();
  });

  test("should render correctly", async () => {
    const btn = screen.getByTestId("theme-switch");

    await act(async () => {
      fireEvent.click(btn);
    });

    expect(btn).toHaveTextContent("Dark");
  });
});
