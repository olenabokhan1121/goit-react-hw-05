import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';
import axios from 'axios';

export default function MovieRev() {
  const { movieId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovRev = async movieId => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1
`;

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
    async function getRev() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovRev(movieId);
        setPosts(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getRev();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading cast...</p>}
      {error && <p>Something went wrong. Please try again.</p>}
      {!isLoading && !error && posts.length === 0 && (
        <p>We don't have any reviews for this movie</p>
      )}
      {posts.length > 0 &&
        posts.map(post => (
          <div key={post.id} className={styles.post}>
            <p className={styles.title}>Author: {post.author}</p>
            <p>{post.content}</p>
          </div>
        ))}
    </div>
  );
}
