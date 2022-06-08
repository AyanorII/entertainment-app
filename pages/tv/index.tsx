import { Container, Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import React from 'react'
import Card from '../../components/Card/Card';
import Heading from '../../components/Heading';
import useBookmarks from '../../lib/hooks/useBookmarks';
import CurrentSeries from '../../lib/types/CurrentSeries';

type Props = {
  tvSeries: CurrentSeries[];
}

export const getStaticProps = async () => {
  const url = "https://api.themoviedb.org/3/tv/on_the_air";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data.results as CurrentSeries[];

  return {
    props: {
      tvSeries: data,
    },
  };
};

const TVSeries: NextPage<Props> = (tvSeries) => {
  const { bookmarks } = useBookmarks();
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return (
    <Container maxWidth={isDesktop ? false : "lg"}>
      <Heading sx={{ marginBottom: 5 }}>TV Series</Heading>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {tvSeries.tvSeries.map((show) => {
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
}

export default TVSeries
