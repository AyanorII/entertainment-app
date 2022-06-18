import { Box, GlobalStyles, Grid, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [user, userLoading, userError] = useAuthState(auth as any);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!user && !userLoading && pathname !== "/signup") {
      router.push("/login");
    }
  }, [pathname, userLoading]);

  return (
    <>
      <Head>
        <title>Entertainment App | coded by Ayanori Rodrigo Toyoda</title>
        <link rel="icon" href="/logo.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Multi-page entertainment web app using data from the TMDB API, routing, state management, and search functionality. Challenge from Frontend Mentor website."
        />
        <meta
          name="og:description"
          content="Multi-page entertainment web app will using TMDB API, routing, state management, and search functionality. Challenge from Frontend Mentor website."
        />
        <meta
          name="og:title"
          content="Entertainment App | coded by Ayanori Rodrigo Toyoda"
        />
        <meta name="author" content="Ayanori Rodrigo Toyoda" />
        <meta
          name="og:image"
          property="og:image"
          content="https://og-image.vercel.app/Entertainment%20App%20%7C%20coded%20by%20Ayanori%20Toyoda.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fres.cloudinary.com%2Fdz209s6jk%2Fimage%2Fupload%2Fv1646923944%2FChallenges%2Fmaz79cid0jllq0js0qyi.jpg&widths=undefined&widths=750&heights=undefined&heights=500"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={styles} />
        {userLoading && (
          <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
            <ClipLoader loading={userLoading} size={150} color="#FC4747" />
          </Box>
        )}
        {!user && !userLoading && <AuthScreen />}
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
                <SearchBar
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                />
              </Grid>
              <Grid item xs={12}>
                <Component
                  {...pageProps}
                  searchTerm={searchTerm.toLowerCase()}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </ThemeProvider>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    </>
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
