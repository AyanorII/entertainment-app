import { Grid, Stack, Typography } from "@mui/material";
import CurrentMovies from "../../lib/types/CurrentMovies";
import Card from "../Card/Card";

type Props = {
  similarMovies: CurrentMovies[];
};

const Similar = ({ similarMovies }: Props) => {
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
        {similarMovies.slice(0, 9).map((movie) => {
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
      </Grid>
    </Stack>
  );
};

export default Similar;
