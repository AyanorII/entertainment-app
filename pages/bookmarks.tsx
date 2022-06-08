import { Container, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import { User } from "firebase/auth";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "../components/Card/Card";
import Heading from "../components/Heading";
import { auth, firestore } from "../lib/firebase";
import UserBookmark from "../lib/types/UserBookmark";

type Props = {
  bookmarks: any;
};

const Bookmarks: NextPage = () => {
  const [user, loading, error] = useAuthState(auth as any);
  const [bookmarks, setBookmarks] = useState<any>([]);

  useEffect(() => {
    const getUserBookmarks = async (usr: User) => {
      const ref = await firestore.collection(`bookmarks`).doc(usr.uid);
      const observer = ref.onSnapshot(async (docSnapshot) => {
        const data = docSnapshot.data() as UserBookmark;
        const promises = data.bookmarks!.map(async (bookmark) => {
          const {id, media} = bookmark;
          const info = await getInfo(media, id)

          return info
        })

        const bookmarkedItems = await Promise.all(promises)
        setBookmarks(bookmarkedItems)
      })
    };

    const getInfo = async (type: "movie" | "tv", id: number) => {
      const url = `https://api.themoviedb.org/3/${type}/${id}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
      };

      const response = await axios(url, { headers });
      const data = response.data;

      return data;
    };

    getUserBookmarks(user!);
  }, [user]);

  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <Container maxWidth={isDesktop ? false : "lg"}>
      <Heading>Bookmarks</Heading>
      <Grid container spacing={3}>
        {bookmarks.map((bookmark: any) => {
          const { id, poster_path, vote_average } = bookmark;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={""}>
              <Card
                id={id}
                image={poster_path}
                rating={vote_average}
                releaseDate={bookmark.release_date || bookmark.first_air_date}
                isBookmarked
                title={bookmark.title || bookmark.name}
                mediaType={bookmark.release_date ? "movie" : "tv"}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Bookmarks;
