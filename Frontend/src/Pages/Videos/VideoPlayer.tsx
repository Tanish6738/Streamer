import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoService from '../../Services/VideoService';

const VideoPlayer: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) return;
    setLoading(true);
    VideoService.getVideoById(videoId)
      .then((res) => setVideo(res.data))
      .catch(() => setError('Failed to load video.'))
      .finally(() => setLoading(false));
  }, [videoId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#181A20]"><span className="text-[#C7C9D3] text-lg">Loading...</span></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#181A20]"><span className="text-red-400 text-lg font-semibold">{error}</span></div>;
  if (!video) return <div className="min-h-screen flex items-center justify-center bg-[#181A20]"><span className="text-[#C7C9D3] text-lg">Video not found.</span></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181A20] to-[#232526] flex flex-col items-center pt-24 pb-12 px-2 md:px-0">
      <div className="w-full max-w-4xl bg-[#23272F] rounded-2xl shadow-2xl border border-[#353945] p-0 md:p-6 flex flex-col gap-6">
        {/* Video Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 px-4 pt-6 md:pt-0 md:px-0 text-center md:text-left truncate" title={video.title}>{video.title}</h2>
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
          <video
            src={video.videoFile}
            poster={video.thumbnail}
            controls
            className="w-full h-full object-contain rounded-xl bg-black"
          />
        </div>
        {/* Video Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-0">
          <div className="flex items-center gap-3">
            <img
              src={video.owner?.avatar || '/vite.svg'}
              alt={video.owner?.fullName || 'User'}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#353945] bg-[#181A20]"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-white text-base truncate">{video.owner?.fullName || 'Unknown Channel'}</span>
              <span className="text-xs text-[#C7C9D3]">{video.owner?.email || ''}</span>
            </div>
          </div>
          <div className="flex gap-4 items-center text-[#C7C9D3] text-sm font-medium">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        {/* Description */}
        <div className="bg-[#181A20] rounded-xl p-4 text-[#C7C9D3] text-base leading-relaxed shadow-inner mx-2 md:mx-0">
          {video.description}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
