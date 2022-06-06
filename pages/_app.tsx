import { Box, Grid, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import AuthScreen from "../components/auth/AuthScreen";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
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
      {loading && (
        <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <ClipLoader loading={loading} size={150} color="#FC4747" />
        </Box>
      )}
      {!user && <AuthScreen />}
      {user && (
        <Grid container gap={{ xs: 3, lg: 0 }}>
          <Grid item sm={12} lg={1} sx={{ width: "100%" }}>
            <Navbar />
          </Grid>
          <Grid container item xs={12} lg={11} gap={2}>
            <Grid item xs={12}>
              <SearchBar />
            </Grid>
            <Grid item xs={12}>
              <Component {...pageProps} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}

export default MyApp;
