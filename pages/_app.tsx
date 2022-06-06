import { Box, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "../lib/firebase";
import "../styles/globals.css";
import theme from "../styles/Theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.asPath;
  const [user, loading, error] = useAuthState(auth as any);

  useEffect(() => {
    if (!user && !loading && pathname !== "/signup") router.push("/login");
  }, [pathname, loading]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <ClipLoader loading={loading} size={150} color="#FC4747" />
        </Box>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default MyApp;
