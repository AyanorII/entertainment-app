import axios from 'axios';
import { NextPage } from 'next'
import React from 'react'

type Props = {}

// export const getStaticProps = async () => {
//   const url = "https://api.themoviedb.org/3/movie/now_playing";

//   const response = await axios(Url);
//   const data = response.data.results as Current[];

//   return {
//     props: {
//       movies: movieData,
//     },
//   };
// }

const Movies: NextPage = (props: Props) => {
  return (
    <div>index</div>
  )
}

export default Movies
