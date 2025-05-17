import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoService, { type UpdateVideoData } from '../../Services/VideoService';

const VideoEdit: React.FC = () => {
  const { videoId } = useParams<{ videoId: string}>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    setLoading(true);
    VideoService.getVideoById(videoId)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(() => setError('Failed to load video.'))
      .finally(() => setLoading(false));
  }, [videoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }
    setLoading(true);
    try {
      const updateData: UpdateVideoData = { title, description };
      if (thumbnail) updateData.thumbnail = thumbnail;
      await VideoService.updateVideo(videoId!, updateData);
      setSuccess(true);
      setTimeout(() => navigate(-1), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-edit-container" style={{
      maxWidth: 500,
      margin: '3rem auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px #0002',
      padding: '2.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#2563eb', marginBottom: 24 }}>Edit Video</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ width: '100%' }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222' }}>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222' }}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, minHeight: 80 }} />
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#222' }}>Thumbnail (optional)</label>
          <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files?.[0] || null)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 8, border: '1px solid #d1d5db', background: '#f1f5f9' }} />
        </div>
        <button type="submit" disabled={loading} style={{
          width: '100%',
          padding: '0.9rem',
          background: loading ? '#93c5fd' : '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 18,
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: 12
        }}>{loading ? 'Saving...' : 'Save Changes'}</button>
        {error && <div className="error" style={{ color: '#ef4444', marginTop: 8, textAlign: 'center' }}>{error}</div>}
        {success && <div className="success" style={{ color: '#10b981', marginTop: 8, textAlign: 'center' }}>Video updated!</div>}
      </form>
    </div>
  );
};

export default VideoEdit;
