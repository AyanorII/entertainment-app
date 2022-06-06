import { signOut } from "firebase/auth";
import type { NextPage } from "next";
import Trending from "../components/Trending/Trending";
import { auth } from "../lib/firebase";

const Home: NextPage = () => {
  return (
    <div style={{overflowX: "hidden"}}>
      <Trending />
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  );
};

export default Home;
