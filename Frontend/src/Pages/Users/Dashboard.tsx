import { useEffect, useState } from 'react';
import DashboardService from '../../Services/Dashboard';
import UserService from '../../Services/User';

const Dashboard = () => {
  const [channelId, setChannelId] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [engagement, setEngagement] = useState<any>(null);
  const [topVideos, setTopVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        // Get current user to get channelId
        const userRes = await UserService.getCurrentUser();
        const user = userRes.data;
        setChannelId(user._id);
        // Fetch dashboard data
        const [statsRes, videosRes, engagementRes, topVideosRes] = await Promise.all([
          DashboardService.getChannelStats(user._id),
          DashboardService.getChannelVideos(user._id, { limit: 5 }),
          DashboardService.getChannelEngagement(user._id),
          DashboardService.getTopVideos(user._id)
        ]);
        setStats(statsRes.data);
        setVideos(videosRes.data.videos || []);
        setEngagement(engagementRes.data);
        setTopVideos(topVideosRes.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#181A20] to-[#232526]"><span className="text-[#C7C9D3] text-lg">Loading dashboard...</span></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#181A20] to-[#232526]"><span className="text-red-400 text-lg font-semibold">{error}</span></div>;
  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181A20] to-[#232526] flex flex-col items-center pt-24 pb-12 px-2">
      <div className="w-full max-w-5xl bg-[#23272F] rounded-2xl shadow-2xl border border-[#353945] p-6 md:p-10 flex flex-col gap-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight drop-shadow-lg">Channel Dashboard</h2>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 p-5 rounded-xl text-center shadow border border-blue-900/20">
            <div className="text-lg font-semibold text-blue-200">Views</div>
            <div className="text-3xl font-extrabold text-blue-400 mt-1">{stats.totalViews}</div>
          </div>
          <div className="bg-gradient-to-br from-green-600/20 to-green-900/10 p-5 rounded-xl text-center shadow border border-green-900/20">
            <div className="text-lg font-semibold text-green-200">Videos</div>
            <div className="text-3xl font-extrabold text-green-400 mt-1">{stats.totalVideos}</div>
          </div>
          <div className="bg-gradient-to-br from-pink-600/20 to-pink-900/10 p-5 rounded-xl text-center shadow border border-pink-900/20">
            <div className="text-lg font-semibold text-pink-200">Likes</div>
            <div className="text-3xl font-extrabold text-pink-400 mt-1">{stats.totalLikes}</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-900/10 p-5 rounded-xl text-center shadow border border-yellow-900/20">
            <div className="text-lg font-semibold text-yellow-200">Subscribers</div>
            <div className="text-3xl font-extrabold text-yellow-400 mt-1">{stats.totalSubscribers}</div>
          </div>
        </div>
        {/* Recent Videos */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Recent Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recentVideos && stats.recentVideos.length > 0 ? stats.recentVideos.map((video: any) => (
              <div key={video._id} className="flex items-center gap-4 bg-[#181A20] p-4 rounded-xl border border-[#353945] shadow group hover:shadow-lg transition-all">
                <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover rounded-lg border border-[#353945]" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{video.title}</div>
                  <div className="text-xs text-[#C7C9D3]">Views: {video.views}</div>
                  <div className="text-xs text-[#C7C9D3]">{new Date(video.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            )) : <div className="col-span-2 text-[#C7C9D3]">No recent videos.</div>}
          </div>
        </div>
        {/* Trending Videos */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Trending Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.trendingVideos && stats.trendingVideos.length > 0 ? stats.trendingVideos.map((video: any) => (
              <div key={video._id} className="flex items-center gap-4 bg-[#181A20] p-4 rounded-xl border border-[#353945] shadow group hover:shadow-lg transition-all">
                <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover rounded-lg border border-[#353945]" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{video.title}</div>
                  <div className="text-xs text-[#C7C9D3]">Views: {video.views}</div>
                  <div className="text-xs text-[#C7C9D3]">{new Date(video.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            )) : <div className="col-span-2 text-[#C7C9D3]">No trending videos.</div>}
          </div>
        </div>
        {/* Engagement */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Engagement (Last 30 Days)</h3>
          <div className="overflow-x-auto rounded-xl border border-[#353945] bg-[#181A20] shadow">
            <table className="min-w-full text-sm text-[#C7C9D3]">
              <thead>
                <tr className="bg-[#23272F]">
                  <th className="px-2 py-2 font-semibold">Date</th>
                  <th className="px-2 py-2 font-semibold">Views</th>
                  <th className="px-2 py-2 font-semibold">Comments</th>
                </tr>
              </thead>
              <tbody>
                {(engagement?.dailyViews || []).map((v: any, idx: number) => (
                  <tr key={v._id} className="even:bg-[#23272F]">
                    <td className="px-2 py-1">{v._id}</td>
                    <td className="px-2 py-1">{v.views}</td>
                    <td className="px-2 py-1">{(engagement.dailyComments.find((c: any) => c._id === v._id)?.comments) || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Videos */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Top Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topVideos && topVideos.length > 0 ? topVideos.map((video: any) => (
              <div key={video._id} className="flex items-center gap-4 bg-[#181A20] p-4 rounded-xl border border-[#353945] shadow group hover:shadow-lg transition-all">
                <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover rounded-lg border border-[#353945]" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{video.title}</div>
                  <div className="text-xs text-[#C7C9D3]">Views: {video.views}</div>
                  <div className="text-xs text-[#C7C9D3]">{new Date(video.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            )) : <div className="col-span-2 text-[#C7C9D3]">No top videos.</div>}
          </div>
        </div>
        {/* All My Videos */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">All My Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {videos && videos.length > 0 ? videos.map((video: any) => (
              <div key={video._id} className="flex items-center gap-4 bg-[#181A20] p-4 rounded-xl border border-[#353945] shadow group hover:shadow-lg transition-all">
                <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover rounded-lg border border-[#353945]" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{video.title}</div>
                  <div className="text-xs text-[#C7C9D3]">Views: {video.views}</div>
                  <div className="text-xs text-[#C7C9D3]">{new Date(video.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            )) : <div className="col-span-2 text-[#C7C9D3]">No videos uploaded yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;