import axiosInstance from '../Config/Axios';

export interface VideoData {
  title: string;
  description: string;
  videoFile: File;
  thumbnail: File;
  duration?: number; // Add duration to VideoData interface
  isPublished?: boolean; // Add isPublished to VideoData interface
}

export interface UpdateVideoData {
  title?: string;
  description?: string;
  thumbnail?: File;
}

class VideoService {
  /**
   * Get all videos (with optional query, sort, pagination, userId)
   */
  async getAllVideos(params: Record<string, any> = {}) {
    const response = await axiosInstance.get('/videos', { params });
    return response.data;
  }

  /**
   * Get a video by its ID
   */
  async getVideoById(videoId: string) {
    const response = await axiosInstance.get(`/videos/${videoId}`);
    return response.data;
  }

  /**
   * Publish (create) a new video
   */
  async publishVideo(data: VideoData) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('videoFile', data.videoFile);
    formData.append('thumbnail', data.thumbnail);
    if (data.duration !== undefined) formData.append('duration', String(data.duration));
    if (data.isPublished !== undefined) formData.append('isPublished', String(data.isPublished));
    const response = await axiosInstance.post('/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  /**
   * Update a video (title, description, thumbnail)
   */
  async updateVideo(videoId: string, data: UpdateVideoData) {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.thumbnail) formData.append('thumbnail', data.thumbnail);
    const response = await axiosInstance.patch(`/videos/${videoId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  /**
   * Delete a video by its ID
   */
  async deleteVideo(videoId: string) {
    const response = await axiosInstance.delete(`/videos/${videoId}`);
    return response.data;
  }

  /**
   * Toggle publish status of a video
   */
  async togglePublishStatus(videoId: string) {
    const response = await axiosInstance.patch(`/videos/toggle/publish/${videoId}`);
    return response.data;
  }
}

export default new VideoService();
