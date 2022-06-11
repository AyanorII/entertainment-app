import { Container, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
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
    revalidate :3600
  };
};

const Movies: NextPage<Props> = ({ movies, searchTerm }) => {
  const { bookmarks } = useBookmarks();
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm )
  );

  return (
    <>
      <Head>
        <title>Entertainment App | coded by Ayanori Rodrigo Toyoda</title>
        <link rel="icon" href="/logo.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Multi-page entertainment web app will using TMDB API, routing, state management, and search functionality. Challenge from Frontend Mentor website."
        />
        <meta
          name="og:description"
          content="Multi-page entertainment web app will using TMDB API, routing, state management, and search functionality. Challenge from Frontend Mentor website."
        />
        <meta
          name="og:title"
          content="Entertainment App | coded by Ayanori Rodrigo Toyoda"
        />
        <meta
          name="og:image"
          content="https://og-image.vercel.app/Entertainment%20App%20%7C%20coded%20by%20Ayanori%20Toyoda.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fres.cloudinary.com%2Fdz209s6jk%2Fimage%2Fupload%2Fv1646923944%2FChallenges%2Fmaz79cid0jllq0js0qyi.jpg&widths=undefined&widths=750&heights=undefined&heights=500"
        />
      </Head>
      <Container
        maxWidth={isDesktop ? false : "lg"}
        sx={{ paddingRight: { xl: 6 } }}
      >
        <Heading>Movies</Heading>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {filteredMovies.map((movie) => {
            const { id, title, poster_path, release_date, vote_average } =
              movie;

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
    </>
  );
};

export default Movies;
