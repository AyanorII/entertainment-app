import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import { default as TrendingData } from "../../lib/types/TrendingData";
import Card from "../Card/Card";
import Heading from "../Heading";

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600,
  };
};

const Trending = () => {
  const [trendingData, setTrendingData] = useState<TrendingData[] | null>(null);

  useEffect(() => {
    const getTrending = async () => {
      const url = "https://api.themoviedb.org/3/trending/all/day";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNmMmMzOWQ1YmJlMWMyZmYwNzZhNzc3ZWIxNTA3YSIsInN1YiI6IjYyMGUwZWM5MWFkOTNiMDA2ZmQzMmJmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PBIteS8CUuR5kanbGmNtWjHGeZnE-jzjVyTKKjhF_qs`,
      };
      try {
        const response = await axios(url, {
          method: "GET",
          headers,
        });
        const data = await response.data;

        const results = data.results;
        const sortedResults = results.sort(
          (a: TrendingData, b: TrendingData) => {
            return b.popularity - a.popularity;
          }
        );

        setTrendingData(sortedResults as TrendingData[]);
      } catch (err) {
        console.log(err);
      }
    };

    getTrending();
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Heading>Trending</Heading>
      </Container>
      <Stack
        flexDirection="row"
        overflow="auto"
        minWidth="100vw"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        padding={{ xs: 2, sm: 3 }}
      >
        {trendingData &&
          trendingData.slice(0, 10).map((item: TrendingData) => {
            const {
              id,
              title: title,
              release_date: releaseDate,
              poster_path: image,
              vote_average: rating,
              original_name: originalName,
              first_air_date: firstAirDate,
            } = item;

            return (
              <Card
                key={ id }
                id={ id }
                mediaType={firstAirDate ? "tv" : "movie"}
                title={title || originalName}
                releaseDate={releaseDate || firstAirDate}
                rating={rating}
                image={image || ""}
                isBookmarked={false}
                big
              />
            );
          })}
      </Stack>
    </>
  );
};

export default Trending;
