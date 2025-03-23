import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';
export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [debouncedQuery] = useDebounce(query, 300);
  const [searchText, setSearchText] = useState(query);
  const handleInputChange = event => {
    setSearchText(event.target.value); // Оновлюємо текстове поле
  };

  const changeSearchText = () => {
    const nextParams = new URLSearchParams(searchParams);

    if (searchText.trim() !== '') {
      nextParams.set('query', searchText);
    } else {
      nextParams.delete('query');
    }

    setSearchParams(nextParams);
  };
  const fetchMov = async debouncedQuery => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${debouncedQuery}&include_adult=false&language=en-US&page=1`;

    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzViODYzYTRmMTdhMDQzNzk0M2RjZTg5MmExYWI0MiIsIm5iZiI6MTc0MjY1MjAwMS45OTEwMDAyLCJzdWIiOiI2N2RlYzI2MWViYThmZDdhMGQ2OTZjN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e-BNb-Zb_BTXaM11JCRyp1gPlKrU452O7_vX_OXPB8U',
      },
    };
    const info = await axios.get(url, options);
    return info.data;
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    async function getMov() {
      try {
        setIsLoading(true);
        setError(false);
        const inf = await fetchMov(debouncedQuery);
        setMovies(inf.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMov();
  }, [debouncedQuery]);
  return (
    <>
      <input type="text" value={searchText} onChange={handleInputChange} />
      <button type="button" onClick={changeSearchText}>
        Search
      </button>
      {isLoading && <b>Loading users...</b>}
      {error && <b>Whoops there was an error, plz reload the page...</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
