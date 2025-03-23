import { useEffect, useState } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';
const fetchMov = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

  const options = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzViODYzYTRmMTdhMDQzNzk0M2RjZTg5MmExYWI0MiIsIm5iZiI6MTc0MjY1MjAwMS45OTEwMDAyLCJzdWIiOiI2N2RlYzI2MWViYThmZDdhMGQ2OTZjN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e-BNb-Zb_BTXaM11JCRyp1gPlKrU452O7_vX_OXPB8U',
    },
  };
  const info = await axios.get(url, options);
  return info.data;
};
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMov() {
      try {
        setIsLoading(true);
        setError(false);
        const inf = await fetchMov();
        setMovies(inf.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMov();
  }, []);

  return (
    <>
      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops there was an error, plz reload the page...</b>}
      {movies.length > 0 && (
        <>
          <h1>Trending today</h1>
          <MovieList movies={movies} />
        </>
      )}
    </>
  );
}
