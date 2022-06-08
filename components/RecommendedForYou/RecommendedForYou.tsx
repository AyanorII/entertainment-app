import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import useBookmarks from "../../lib/hooks/useBookmarks";
import CurrentMovies from "../../lib/types/CurrentMovies";
import CurrentSeries from "../../lib/types/CurrentSeries";
import Recommended from "../../lib/types/Recommended";
import Card from "../Card/Card";
import Heading from "../Heading";

type Props = {};

export const getStaticProps = async () => {
  const moviesUrl = "https://api.themoviedb.org/3/movie/now_playing";
  const tvUrl = "https://api.themoviedb.org/3/tv/on_the_air";

  const moviesResponse = await axios(moviesUrl);
  const movieData = moviesResponse.data.results as CurrentMovies[];

  const tvResponse = await axios(tvUrl);
  const tvData = tvResponse.data.results as CurrentSeries[];

  return {
    props: {
      movies: movieData,
      tvSeries: tvData,
    },
  };
};

const RecommendedForYou = (props: Props) => {
  const [allData, setAllData] = useState<Recommended[]>([]);

  useEffect(() => {
    const getData = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
      };

      const moviesUrl = "https://api.themoviedb.org/3/movie/now_playing";
      const tvUrl = "https://api.themoviedb.org/3/tv/on_the_air";

      const moviesResponse = await axios(moviesUrl, { headers });
      const movieData = moviesResponse.data.results as CurrentMovies[];

      const tvResponse = await axios(tvUrl, { headers });
      const tvData = tvResponse.data.results as CurrentSeries[];

      setAllData([
        ...movieData.splice(0, 20),
        ...tvData.splice(0, 20),
      ] as Recommended[]);
    };

    getData();
  }, []);

  const {bookmarks} = useBookmarks();

  return (
    <Container maxWidth={false} sx={{marginTop: 5}}>
      <Heading>Recommended for you</Heading>
      <Grid
        container
        spacing={ { xs: 2, sm: 3, md: 4 } }
        sx={{marginTop: 5}}
      >
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

          const isBookmarked = Boolean(bookmarks.find(bookmark => bookmark.id === id));

          return (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                id={ id }
                mediaType={firstAirDate ? "tv" : "movie"}
                image={posterPath || ""}
                title={title || name}
                rating={voteAverage}
                releaseDate={release_date || firstAirDate}
                isBookmarked={ isBookmarked }
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default RecommendedForYou;
