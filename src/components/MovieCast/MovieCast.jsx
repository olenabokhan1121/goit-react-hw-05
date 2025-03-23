import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import axios from 'axios';

export default function MovieCast() {
  const { movieId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  const fetchMovCast = async movieId => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

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
    async function getCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovCast(movieId);
        setPosts(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading cast...</p>}
      {error && <p>Something went wrong. Please try again.</p>}
      {!isLoading && !error && posts.length === 0 && (
        <p>No cast information available.</p>
      )}
      {posts.length > 0 &&
        posts.map(post => (
          <div key={post.id} className={styles.post}>
            <img
              src={
                post.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${post.profile_path}`
                  : defaultImg
              }
              width={150}
              alt="post.name"
            />
            <h3 className={styles.title}>{post.name}</h3>
            <p className={styles.body}>Character: {post.character}</p>
          </div>
        ))}
    </div>
  );
}
