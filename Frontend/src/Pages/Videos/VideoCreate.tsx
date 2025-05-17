import React, { useState } from 'react';
import VideoService from '../../Services/VideoService';
import { useNavigate } from 'react-router-dom';

const VideoCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);

  const navigate = useNavigate();

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
    if (file) {
      // Get video duration
      const url = URL.createObjectURL(file);
      const videoEl = document.createElement('video');
      videoEl.preload = 'metadata';
      videoEl.onloadedmetadata = () => {
        setDuration(videoEl.duration);
        URL.revokeObjectURL(url);
      };
      videoEl.src = url;
    } else {
      setDuration(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title || !description || !videoFile || !thumbnail || duration === null) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await VideoService.publishVideo({ title, description, videoFile, thumbnail, duration, isPublished });
      // Immediately redirect after successful upload
      navigate('/home');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to upload video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#181A20] to-[#232526] py-16 px-2">
      <div className="w-full max-w-lg bg-[#23272F] rounded-2xl shadow-2xl border border-[#353945] p-8 flex flex-col items-center gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center tracking-tight drop-shadow-lg">Upload New Video</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block font-semibold text-[#C7C9D3] mb-2">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full px-4 py-2 rounded-lg bg-[#181A20] border border-[#353945] text-white focus:ring-2 focus:ring-[#ff512f] focus:outline-none text-base placeholder:text-[#C7C9D3]" placeholder="Enter video title..." />
          </div>
          {/* Description */}
          <div>
            <label className="block font-semibold text-[#C7C9D3] mb-2">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required
              className="w-full px-4 py-2 rounded-lg bg-[#181A20] border border-[#353945] text-white focus:ring-2 focus:ring-[#ff512f] focus:outline-none text-base min-h-[80px] placeholder:text-[#C7C9D3]" placeholder="Describe your video..." />
          </div>
          {/* Video File */}
          <div>
            <label className="block font-semibold text-[#C7C9D3] mb-2">Video File</label>
            <input type="file" accept="video/*" onChange={handleVideoFileChange} required
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ff512f] file:text-white file:font-semibold file:cursor-pointer bg-[#181A20] text-[#C7C9D3]" />
            {duration !== null && (
              <span className="text-xs text-[#C7C9D3] mt-1 block">Duration: {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)} min</span>
            )}
          </div>
          {/* Thumbnail */}
          <div>
            <label className="block font-semibold text-[#C7C9D3] mb-2">Thumbnail</label>
            <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files?.[0] || null)} required
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#2563eb] file:text-white file:font-semibold file:cursor-pointer bg-[#181A20] text-[#C7C9D3]" />
          </div>
          {/* isPublished Toggle */}
          <div className="flex items-center gap-3">
            <input
              id="isPublished"
              type="checkbox"
              checked={isPublished}
              onChange={e => setIsPublished(e.target.checked)}
              className="w-5 h-5 accent-[#ff512f] rounded focus:ring-2 focus:ring-[#ff512f] border border-[#353945] bg-[#181A20]"
            />
            <label htmlFor="isPublished" className="text-[#C7C9D3] font-semibold cursor-pointer select-none">
              Publish immediately
            </label>
          </div>
          {/* Preview (optional) */}
          <div className="flex gap-4 items-center justify-center">
            {thumbnail && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-[#C7C9D3] mb-1">Thumbnail Preview</span>
                <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail Preview" className="w-24 h-16 object-cover rounded-lg border border-[#353945] shadow" />
              </div>
            )}
            {videoFile && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-[#C7C9D3] mb-1">Video File</span>
                <span className="text-xs text-[#ff512f] font-semibold">{videoFile.name}</span>
              </div>
            )}
          </div>
          {/* Submit Button */}
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#ff512f] hover:bg-[#dd2476] text-white rounded-xl font-bold text-lg shadow-lg transition-colors disabled:bg-[#353945] disabled:cursor-not-allowed mt-2">
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
          {/* Error/Success */}
          {error && <div className="text-center text-red-400 font-semibold mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default VideoCreate;
