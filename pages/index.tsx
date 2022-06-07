import { Stack } from "@mui/material";
import { signOut } from "firebase/auth";
import type { NextPage } from "next";
import RecommendedForYou from "../components/RecommendedForYou/RecommendedForYou";
import Trending from "../components/Trending/Trending";
import { auth } from "../lib/firebase";

const Home: NextPage = () => {
  return (
    <Stack overflow="hidden">
      <Trending />
      <RecommendedForYou />
      <button onClick={() => signOut(auth)}>Sign out</button>
    </Stack>
  );
};

export default Home;
