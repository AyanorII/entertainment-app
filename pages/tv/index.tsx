import { Container, Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading";
import useBookmarks from "../../lib/hooks/useBookmarks";
import CurrentSeries from "../../lib/types/CurrentSeries";

type Props = {
  tvSeries: CurrentSeries[];
  searchTerm: string;
};

export const getStaticProps = async () => {
  const baseUrl = "https://api.themoviedb.org/3/tv/on_the_air";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const tvSeries = [];

  for (let i = 1; i < 5; i++) {
    const response = await axios(`${baseUrl}?page=${i}`, { headers });
    const data = response.data.results as CurrentSeries[];
    tvSeries.push(...data);
  }

  return {
    props: {
      tvSeries,
    },
    revalidate: 3600,
  };
};

const TVSeries: NextPage<Props> = ({ tvSeries, searchTerm }) => {
  const { bookmarks } = useBookmarks();
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const filteredTvSeries = tvSeries.filter((show) =>
    show.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Container
      maxWidth={isDesktop ? false : "lg"}
      sx={{ paddingRight: { xl: 6 } }}
    >
      <Heading sx={{ marginBottom: 5 }}>TV Series</Heading>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {filteredTvSeries.map((show) => {
          const { id, name, poster_path, first_air_date, vote_average } = show;

          const isBookmarked = Boolean(
            bookmarks.find((bookmark) => bookmark.id === id)
          );

          return (
            <Grid xs={12} sm={6} md={4} lg={3} item key={id} spacing={5}>
              <Card
                image={poster_path!}
                title={name}
                rating={vote_average}
                releaseDate={first_air_date}
                id={id}
                mediaType="tv"
                isBookmarked={isBookmarked}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default TVSeries;
