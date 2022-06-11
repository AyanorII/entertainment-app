import { Container, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading";
import useBookmarks from "../../lib/hooks/useBookmarks";
import CurrentMovies from "../../lib/types/CurrentMovies";

type Props = {
  movies: CurrentMovies[];
  searchTerm: string;
};

export const getStaticProps = async () => {
  const baseUrl = "https://api.themoviedb.org/3/movie/now_playing";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const movies = [];

  for (let i = 1; i < 5; i++) {
    const response = await axios(`${baseUrl}?page=${i}`, { headers });
    const data = response.data.results as CurrentMovies[];
    movies.push(...data);
  }

  return {
    props: {
      movies,
    },
    revalidate: 3600,
  };
};

const Movies: NextPage<Props> = ({ movies, searchTerm }) => {
  const { bookmarks } = useBookmarks();
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  return (
    <Container
      maxWidth={isDesktop ? false : "lg"}
      sx={{ paddingRight: { xl: 6 } }}
    >
      <Heading>Movies</Heading>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {filteredMovies.map((movie) => {
          const { id, title, poster_path, release_date, vote_average } = movie;

          const isBookmarked = Boolean(
            bookmarks.find((bookmark) => bookmark.id === id)
          );

          return (
            <Grid xs={12} sm={6} md={4} lg={3} item key={id} spacing={5}>
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
