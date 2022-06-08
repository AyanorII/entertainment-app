import { Grid, Stack, Typography } from "@mui/material";
import CurrentMovies from "../../lib/types/CurrentMovies";
import CurrentSeries from "../../lib/types/CurrentSeries";
import Card from "../Card/Card";

type Props = {
  similarMovies?: CurrentMovies[];
  similarShows?: CurrentSeries[];
};

const Similar = ({ similarMovies, similarShows }: Props) => {
  return (
    <Stack gap={2} marginTop={{ xs: 8, md: 12 }}>
      <Typography
        variant="h4"
        color="text.primary"
        gutterBottom
        fontWeight="light"
      >
        Similar
      </Typography>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* --------------------------- Movies ----------------------------- */}
        {similarMovies &&
          similarMovies.slice(0, 9).map((movie) => {
            const {
              id,
              title,
              poster_path: image,
              vote_average: rating,
              release_date: releaseDate,
            } = movie;

            return (
              <Grid key={id} item xs={6} sm={4} lg={3} xl={2}>
                <Card
                  id={id}
                  image={image!}
                  rating={rating}
                  releaseDate={releaseDate}
                  title={title}
                  isBookmarked={false}
                  mediaType="movie"
                />
              </Grid>
            );
          })}
        {/* --------------------------- Movies ----------------------------- */}
        {/* -------------------------- TV Shows ---------------------------- */}
        {similarShows &&
          similarShows.slice(0, 9).map((movie) => {
            const {
              id,
              name,
              poster_path: image,
              vote_average: rating,
              first_air_date: releaseDate,
            } = movie;

            return (
              <Grid key={id} item xs={6} sm={4} lg={3}>
                <Card
                  id={id}
                  image={image!}
                  rating={rating}
                  releaseDate={releaseDate}
                  title={name}
                  isBookmarked={false}
                  mediaType="tv"
                />
              </Grid>
            );
          })}
        {/* -------------------------- TV Shows ---------------------------- */}
      </Grid>
    </Stack>
  );
};

export default Similar;
