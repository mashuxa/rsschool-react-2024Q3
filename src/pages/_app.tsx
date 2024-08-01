import "../styles.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { ThemeProvider } from "src/providers/ThemeProvider/ThemeProvider";
import StoreProvider from "src/providers/StoreProvider/StoreProvider";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
