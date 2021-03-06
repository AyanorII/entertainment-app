import { Container, Grid } from "@mui/material";
import useMoviesAndShows from "../../lib/hooks/useMoviesAndShows";
import useBookmarks from "../../lib/hooks/useBookmarks";
import Card from "../Card/Card";
import Heading from "../Heading";

const RecommendedForYou = () => {
  const { bookmarks } = useBookmarks();
  const { allData } = useMoviesAndShows();

  return (
    <Container maxWidth={false} sx={{ marginTop: 5 }}>
      <Heading>Recommended for you</Heading>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ marginTop: 5 }}>
        {allData.map((item) => {
          const {
            id,
            poster_path: posterPath,
            name,
            title,
            release_date,
            vote_average: voteAverage,
            first_air_date: firstAirDate,
          } = item;

          const isBookmarked = Boolean(
            bookmarks.find((bookmark) => bookmark.id === id)
          );

          return (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                id={id}
                mediaType={firstAirDate ? "tv" : "movie"}
                image={posterPath || ""}
                title={title || name}
                rating={voteAverage}
                releaseDate={release_date || firstAirDate}
                isBookmarked={isBookmarked}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default RecommendedForYou;
