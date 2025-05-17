import HomeService from '../Services/Home';
import UserService from '../Services/User';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [publicVideos, setPublicVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    HomeService.getPublicVideos()
      .then((data) => {
        const videos = Array.isArray(data)
          ? data
          : Array.isArray(data?.data?.docs)
            ? data.data.docs
            : Array.isArray(data?.data)
              ? data.data
              : [];
        setPublicVideos(videos);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load public videos.' + err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    UserService.getCurrentUser()
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => setUserLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181A20] to-[#232526] pt-24 pb-12 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight">Welcome to <span className="text-[#ff512f]">Streamer</span></h1>
        <p className="text-lg md:text-xl text-[#C7C9D3] mb-8 max-w-2xl mx-auto">Discover, share, and enjoy videos from creators around the world.</p>
        <div className="my-8 flex flex-col md:flex-row items-center justify-center gap-4">
          {userLoading ? null : user ? (
            <>
              <span className="font-semibold text-[#ff512f] text-lg md:mr-4">Welcome, {user.fullName}!</span>
              <Link to="/dashboard">
                <button className="px-6 py-2 bg-[#ff512f] hover:bg-[#dd2476] text-white rounded-xl font-semibold shadow-lg transition-colors">Go to Dashboard</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth">
                <button className="px-6 py-2 bg-[#ff512f] hover:bg-[#dd2476] text-white rounded-xl font-semibold shadow-lg transition-colors md:mr-2 mb-2 md:mb-0">Login</button>
              </Link>
              <Link to="/auth">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-colors">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </section>
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Public Videos</h2>
          <div className="flex gap-3">
            <Link to="/videos/create">
              <button className="px-5 py-2 bg-[#ff512f] hover:bg-[#dd2476] text-white rounded-xl font-semibold shadow-lg transition-colors">Upload Video</button>
            </Link>
            <Link to="/dashboard">
              <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-colors">My Dashboard</button>
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lg text-[#C7C9D3] py-12">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400 font-semibold py-12">{error}</div>
        ) : publicVideos.length === 0 ? (
          <div className="text-center text-[#C7C9D3] py-12">No public videos available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(publicVideos || []).map((video: any) => (
              <div key={video._id} className="bg-[#23272F] rounded-xl shadow-xl border border-[#353945] flex flex-col transition-all duration-200 group overflow-hidden hover:shadow-2xl">
                {/* Thumbnail */}
                <Link to={`/videos/${video._id}`} className="block relative w-full aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail || video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    {video.duration && video.duration > 0
                      ? new Date(video.duration * 1000).toISOString().substr(11, 8).replace(/^00:/, '')
                      : '00:00'}
                  </span>
                </Link>
                {/* Video Info */}
                <div className="flex gap-3 mt-3 px-2 pb-2">
                  {/* Avatar */}
                  <Link to={video.owner?._id ? `/profile/${video.owner._id}` : '#'} className="shrink-0">
                    <img
                      src={video.owner?.avatar || '/vite.svg'}
                      alt={video.owner?.fullName || 'User'}
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#353945] bg-[#181A20]"
                    />
                  </Link>
                  {/* Title and meta */}
                  <div className="flex flex-col min-w-0">
                    <Link to={`/videos/${video._id}`}
                      className="font-semibold text-white text-base leading-tight truncate hover:text-[#ff512f] transition-colors"
                      title={video.title}
                    >
                      {video.title}
                    </Link>
                    <span className="text-sm text-[#C7C9D3] truncate hover:underline cursor-pointer">
                      {video.owner?.fullName || video.channelName || 'Unknown'}
                    </span>
                    <div className="flex gap-2 text-xs text-[#C7C9D3] mt-0.5">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;