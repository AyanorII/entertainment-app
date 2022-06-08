import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Details from "../../components/Details/Details";
import useBookmarks from "../../lib/hooks/useBookmarks";
import CurrentMovies from "../../lib/types/CurrentMovies";
import MovieDetails from "../../lib/types/MovieDetails";

type Props = {
  movie: MovieDetails;
  similarMovies: CurrentMovies[];
};

export async function getStaticPaths() {
  const url = "https://api.themoviedb.org/3/movie/now_playing";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data.results as CurrentMovies[];

  const paths = data.map((movie) => {
    return { params: { id: movie.id.toString() } };
  });

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = `https://api.themoviedb.org/3/movie/${context!.params!.id}`;
  const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${
    context!.params!.id
  }/similar`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  };

  const response = await axios(url, { headers });
  const data = response.data as MovieDetails;

  const similarMoviesResponse = await axios(similarMoviesUrl, { headers });
  const similarMoviesData = similarMoviesResponse.data
    .results as CurrentMovies[];

  return {
    props: {
      movie: data,
      similarMovies: similarMoviesData,
    },
  };
};

const Movie: NextPage<Props> = ({ movie, similarMovies }) => {
  const { bookmarks } = useBookmarks();

  const isBookmarked = Boolean(
    bookmarks.find((bookmark) => bookmark.id === movie.id)
  );

  return (
    <Details
      movie={movie}
      similarMovies={similarMovies}
      isBookmarked={isBookmarked}
    />
  );
};

export default Movie;
