import { Container, Grid, Skeleton } from "@mui/material";
import Image from "next/image";
import CurrentMovies from "../../lib/types/CurrentMovies";
import CurrentSeries from "../../lib/types/CurrentSeries";
import MovieDetails from "../../lib/types/MovieDetails";
import TvShowDetails from "../../lib/types/TvShowDetails";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import GoBackButton from "../GoBackButton";
import Overview from "../MoviePage/Overview";
import Similar from "./Similar";
import Info from "./Info";

type Props = {
  movie?: MovieDetails;
  tvShow?: TvShowDetails;
  similarMovies?: CurrentMovies[];
  similarTvShows?: CurrentSeries[];
  isBookmarked: boolean;
};

const Details = ({
  movie,
  tvShow,
  similarMovies,
  similarTvShows,
  isBookmarked,
}: Props) => {
  return (
    <Container maxWidth={false} sx={{paddingRight: {xl: 6}}}>
      <GoBackButton />
      <Grid container gap={10}>
        <Grid
          item
          xs={12}
          md={5}
          position="relative"
          height="calc(50vh + 30vw)"
          maxHeight="80vh"
        >
          {(movie?.poster_path || tvShow?.poster_path) && (
            <Image
              src={
                ("https://image.tmdb.org/t/p/original" +
                  (movie?.poster_path || tvShow?.poster_path)) as string
              }
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={movie?.title || tvShow?.name}
              style={{ borderRadius: 8 }}
              priority
            />
          )}
          {!(movie?.poster_path || tvShow?.poster_path) && (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
          <BookmarkButton
            isBookmarked={isBookmarked}
            id={ (movie?.id || tvShow?.id)! }
            mediaType={movie ? "movie" : "tv"}
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
              title={(movie?.title || tvShow?.name) as string}
              rating={(movie?.vote_average || tvShow?.vote_average) as number}
              tagline={(movie?.tagline || tvShow?.tagline) as string}
              overview={(movie?.overview || tvShow?.overview) as string}
            />
          </Grid>
          <Grid item xs={12}>
            {(movie?.genres || tvShow?.genres) && (
              <Info
                genres={(movie?.genres || tvShow?.genres)!}
                releaseDate={
                  (movie?.release_date || tvShow?.first_air_date) as string
                }
                numberOfEpisodes={tvShow?.number_of_episodes}
                numberOfSeasons={tvShow?.number_of_seasons}
                runtime={movie?.runtime}
                budget={movie?.budget}
                revenue={movie?.revenue}
                status={tvShow?.status}
                productionCountries={
                  (movie?.production_countries || tvShow?.production_countries)!
                }
              />
            )}
            {!(movie?.genres || tvShow?.genres) && (
              <Skeleton variant="rectangular" height="100%" width="100%" />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Similar similarMovies={similarMovies} similarShows={similarTvShows} />
    </Container>
  );
};

export default Details;
