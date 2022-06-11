import axios from "axios";
import { useEffect, useState } from "react";
import CurrentMovies from "../types/CurrentMovies";
import CurrentSeries from "../types/CurrentSeries";
import Recommended from "../types/Recommended";

const useMoviesAndShows = () => {
  const [movies, setMovies] = useState<CurrentMovies[]>([]);
  const [shows, setShows] = useState<CurrentSeries[]>([]);
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

      setMovies(movieData);
      setShows(tvData);

      setAllData([
        ...movieData,
        ...tvData,
      ] as Recommended[]);
    };

    getData();
  }, []);

  return {movies, shows, allData};
};

export default useMoviesAndShows;
