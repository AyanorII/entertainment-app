import { Container, Grid } from "@mui/material";
import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import GoBackButton from "../../components/GoBackButton";
import MovieInfo from "../../components/MoviePage/MovieInfo";
import Overview from "../../components/MoviePage/Overview";
import Similar from "../../components/MoviePage/Similar";
import CurrentMovies from "../../lib/types/CurrentMovies";
import MovieDetails from "../../lib/types/MovieDetails";

type Props = {
  movie: MovieDetails;
  similarMovies: CurrentMovies[];
};

export async function getStaticPaths() {
  const url = "https://api.themoviedb.org/3/movie/now_playing";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data.results as CurrentMovies[];

  const paths = data.map((movie) => {
    return { params: { id: movie.id.toString() } };
  });

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = `https://api.themoviedb.org/3/movie/${context!.params!.id}`;
  const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${
    context!.params!.id
  }/similar`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data as MovieDetails;

  const similarMoviesResponse = await axios(similarMoviesUrl, { headers });
  const similarMoviesData = similarMoviesResponse.data.results as CurrentMovies[];

  return {
    props: {
      movie: data,
      similarMovies: similarMoviesData,
    },
  };
};

const Movie: NextPage<Props> = ({ movie, similarMovies }) => {
  const {
    poster_path: image,
    title,
    overview,
    release_date: releaseDate,
    vote_average: rating,
    runtime,
    budget,
    revenue,
    genres,
    tagline,
    production_countries: productionCountries,
    id,
  } = movie;
  return (
    <Container maxWidth={ false }>
      <GoBackButton />
      <Grid container gap={5}>
        <Grid
          item
          xs={12}
          md={6}
          position="relative"
          height="calc(50vh + 30vw)"
          maxHeight="80vh"
        >
          <Image
            src={"https://image.tmdb.org/t/p/original" + image || ""}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={title}
            style={{ borderRadius: 8 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          container
          rowGap={{ xs: 5, xl: 0 }}
          alignItems="center"
        >
          <Grid item xs={12}>
            <Overview
              title={title}
              rating={rating}
              tagline={tagline!}
              overview={overview}
            />
          </Grid>
          <Grid item xs={12}>
            <MovieInfo
              genres={genres}
              releaseDate={releaseDate}
              runtime={runtime}
              budget={budget}
              revenue={revenue}
              productionCountries={productionCountries}
            />
          </Grid>
        </Grid>
      </Grid>
      <Similar similarMovies={similarMovies} />
    </Container>
  );
};

export default Movie;
