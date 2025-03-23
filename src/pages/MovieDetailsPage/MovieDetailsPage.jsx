import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import axios from 'axios';
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');
  const fetchMovById = async movieId => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

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
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovById(movieId);

        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [movieId]);
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <div>
      <Link to={backLinkRef.current ?? '/movies'}>Go back</Link>

      {isLoading && <b>Loading...</b>}
      {error && <b>Error...</b>}
      {movie && (
        <div>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            width={250}
            alt="poster"
          />
          <h3 className={css.title}>
            {movie.title}({movie?.release_date?.slice(0, 4)})
          </h3>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <p className={css.text}>Overview</p>
          <p>{movie.overview}</p>
          <p className={css.text}>Genres</p>
          <p>
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map(genre => genre.name).join('  ')
              : 'Жанри відсутні'}
          </p>
        </div>
      )}
      <h2>Additional Information</h2>
      <ul>
        <li>
          <NavLink to="cast">Casts</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
