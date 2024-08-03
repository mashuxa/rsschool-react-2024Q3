import { FC, ReactNode } from "react";
import { Metadata } from "next";
import { ThemeProvider } from "src/providers/ThemeProvider/ThemeProvider";
import StoreProvider from "src/providers/StoreProvider/StoreProvider";
import ThemeSwitch from "../components/ThemeSwitcher/ThemeSwitcher";
import "../styles.scss";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            <div
              data-testid="layout"
              className="min-h-screen p-4 bg-gray-100 dark:bg-slate-800"
            >
              <div className="flex justify-end">
                <ThemeSwitch />
              </div>
              <div className="flex items-start mx-auto">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
