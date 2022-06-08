import { Box, GlobalStyles, Grid, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import AuthScreen from "../components/auth/AuthScreen";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
import { auth } from "../lib/firebase";
import useBookmarks from "../lib/hooks/useBookmarks";
import "../styles/globals.css";
import theme from "../styles/Theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.asPath;
  const [user, userLoading, userError] = useAuthState(auth as any);

  useEffect(() => {
    if (!user && !userLoading && pathname !== "/signup") router.push("/login");
  }, [pathname, userLoading]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={styles} />
      {userLoading && (
        <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
          <ClipLoader loading={userLoading} size={150} color="#FC4747" />
        </Box>
      )}
      {!user && <AuthScreen />}
      {user && (
        <Grid container spacing={{ xs: 3, lg: 0 }}>
          <Grid item sm={12} lg={1} position="relative">
            <Navbar />
          </Grid>
          <Grid
            container
            item
            xs={12}
            lg={11}
            gap={3}
            marginTop={{ xs: 7, sm: 15, lg: 6 }}
          >
            <Grid item xs={12} justifyContent="start">
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

const styles = {
  "*::-webkit-scrollbar": {
    width: 10,
    height: 10,
  },
  "*::-webkit-scrollbar-track": {
    boxShadow: `inset 0 0 6px rgba(0,0,0,0.3)`,
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: "#3c455f",
    borderRadius: "8px",
  },
};
