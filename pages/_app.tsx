import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "../styles/Theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
