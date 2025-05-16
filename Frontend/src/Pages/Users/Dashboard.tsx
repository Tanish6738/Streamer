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

  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!stats) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Channel Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-lg font-semibold">Views</div>
          <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-lg font-semibold">Videos</div>
          <div className="text-2xl font-bold text-green-600">{stats.totalVideos}</div>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg text-center">
          <div className="text-lg font-semibold">Likes</div>
          <div className="text-2xl font-bold text-pink-600">{stats.totalLikes}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-lg font-semibold">Subscribers</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.totalSubscribers}</div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Recent Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {stats.recentVideos && stats.recentVideos.length > 0 ? stats.recentVideos.map((video: any) => (
          <div key={video._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
            <img src={video.thumbnail} alt={video.title} className="w-20 h-14 object-cover rounded" />
            <div>
              <div className="font-semibold">{video.title}</div>
              <div className="text-xs text-gray-500">Views: {video.views}</div>
              <div className="text-xs text-gray-400">{new Date(video.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        )) : <div className="col-span-2 text-gray-400">No recent videos.</div>}
      </div>
      <h3 className="text-xl font-semibold mb-2">Trending Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {stats.trendingVideos && stats.trendingVideos.length > 0 ? stats.trendingVideos.map((video: any) => (
          <div key={video._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
            <img src={video.thumbnail} alt={video.title} className="w-20 h-14 object-cover rounded" />
            <div>
              <div className="font-semibold">{video.title}</div>
              <div className="text-xs text-gray-500">Views: {video.views}</div>
              <div className="text-xs text-gray-400">{new Date(video.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        )) : <div className="col-span-2 text-gray-400">No trending videos.</div>}
      </div>
      <h3 className="text-xl font-semibold mb-2">Engagement (Last 30 Days)</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Views</th>
              <th className="px-2 py-1">Comments</th>
            </tr>
          </thead>
          <tbody>
            {(engagement?.dailyViews || []).map((v: any, idx: number) => (
              <tr key={v._id} className="bg-white even:bg-gray-50">
                <td className="px-2 py-1">{v._id}</td>
                <td className="px-2 py-1">{v.views}</td>
                <td className="px-2 py-1">{(engagement.dailyComments.find((c: any) => c._id === v._id)?.comments) || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-xl font-semibold mb-2">Top Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topVideos && topVideos.length > 0 ? topVideos.map((video: any) => (
          <div key={video._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
            <img src={video.thumbnail} alt={video.title} className="w-20 h-14 object-cover rounded" />
            <div>
              <div className="font-semibold">{video.title}</div>
              <div className="text-xs text-gray-500">Views: {video.views}</div>
              <div className="text-xs text-gray-400">{new Date(video.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        )) : <div className="col-span-2 text-gray-400">No top videos.</div>}
      </div>
    </div>
  );
};

export default Dashboard;