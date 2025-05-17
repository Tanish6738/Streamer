import HomeService from '../Services/Home';
import UserService from '../Services/User';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [publicVideos, setPublicVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    HomeService.getPublicVideos()
      .then((data) => {
        // If data is an object with a 'data' property, use that; otherwise, use data directly
        const videos = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];
        setPublicVideos(videos);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load public videos.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    UserService.getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setUserLoading(false));
  }, []);

  return (
    <div className="home-container pt-20" style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem 0' }}>
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#222' }}>Welcome to Streamer</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', margin: '1rem 0' }}>
          Discover, share, and enjoy videos from creators around the world.
        </p>
        <div style={{ margin: '2rem 0' }}>
          {userLoading ? null : user ? (
            <>
              <span style={{ fontWeight: 600, color: '#2563eb', fontSize: '1.1rem', marginRight: 16 }}>
                Welcome, {user.fullName}!
              </span>
              <Link to="/dashboard" style={{ padding: '0.75rem 2rem', background: '#2563eb', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth" style={{ marginRight: 16, padding: '0.75rem 2rem', background: '#2563eb', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Login</Link>
              <Link to="/auth" style={{ padding: '0.75rem 2rem', background: '#10b981', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
            </>
          )}
        </div>
      </section>
      <section style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#222', marginBottom: 24 }}>Public Videos</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : publicVideos.length === 0 ? (
          <div>No public videos available.</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {(publicVideos || []).map((video: any) => (
              <div key={video._id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', width: 260, padding: 16 }}>
                <img src={video.thumbnailUrl || video.thumbnail} alt={video.title} style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{video.title}</h3>
                <p style={{ color: '#666', fontSize: 14, margin: '8px 0' }}>{video.channelName || (video.owner && video.owner.fullName)}</p>
                <p style={{ color: '#888', fontSize: 13 }}>{video.views} views</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;