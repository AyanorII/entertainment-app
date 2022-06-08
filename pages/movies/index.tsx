import { Container, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading";
import useBookmarks from "../../lib/hooks/useBookmarks";
import CurrentMovies from "../../lib/types/CurrentMovies";

type Props = {
  movies: CurrentMovies[];
};

export const getStaticProps = async () => {
  const url = "https://api.themoviedb.org/3/movie/now_playing";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data.results as CurrentMovies[];

  return {
    props: {
      movies: data,
    },
  };
};

const Movies: NextPage<Props> = (movies) => {
  const { bookmarks } = useBookmarks();
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <Container maxWidth={isDesktop ? false : "lg"}>
      <Heading>Movies</Heading>
      <Grid container spacing={{xs: 2, sm: 3}}>
        {movies.movies.map((movie) => {
          const { id, title, poster_path, release_date, vote_average } = movie;

          const isBookmarked = Boolean(
            bookmarks.find((bookmark) => bookmark.id === id)
          );

          return (
            <Grid xs={6} md={4} lg={3} item key={id} spacing={5}>
              <Card
                image={poster_path!}
                title={title}
                rating={vote_average}
                releaseDate={release_date}
                id={id}
                mediaType="movie"
                isBookmarked={isBookmarked}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Movies;
