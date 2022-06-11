import { Container, Grid, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import Card from "../components/Card/Card";
import Heading from "../components/Heading";
import RecommendedForYou from "../components/RecommendedForYou/RecommendedForYou";
import Trending from "../components/Trending/Trending";
import useBookmarks from "../lib/hooks/useBookmarks";
import useMoviesAndShows from "../lib/hooks/useMoviesAndShows";

type Props = {
  searchTerm: string;
};

const Home: NextPage<Props> = ({ searchTerm }) => {
  const { allData } = useMoviesAndShows();
  const filteredMoviesAndTvShows = allData.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm) ||
      item.name?.toLowerCase().includes(searchTerm)
  );

  const { bookmarks } = useBookmarks();

  return (
    <Stack overflow="hidden">
      {!searchTerm && (
        <>
          <Trending />
          <RecommendedForYou />
        </>
      )}
      {searchTerm && (
        <Container maxWidth={false} sx={{ marginTop: 5 }}>
          <Heading>
            <>
              Search results for{" "}
              <Typography variant="h4" color="primary" display="inline">
                &quot;{searchTerm}&quot;
              </Typography>{" "}
              : {filteredMoviesAndTvShows.length} results
            </>
          </Heading>
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ marginTop: 5 }}
          >
            {filteredMoviesAndTvShows.map((item) => {
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
      )}
    </Stack>
  );
};

export default Home;
