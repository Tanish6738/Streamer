import axiosInstance from '../Config/Axios';

class DashboardService {
  /**
   * Get channel stats (views, videos, likes, subscribers, recent & trending videos)
   * @param channelId Channel ID
   */
  async getChannelStats(channelId: string) {
    const response = await axiosInstance.get(`/dashboard/stats`, {
      params: { channelId }
    });
    return response.data;
  }

  /**
   * Get paginated channel videos (with search/sort)
   * @param channelId Channel ID
   * @param params Optional query params: page, limit, search, sortBy, sortType
   */
  async getChannelVideos(channelId: string, params: Record<string, any> = {}) {
    const response = await axiosInstance.get(`/dashboard/videos`, {
      params: { channelId, ...params }
    });
    return response.data;
  }

  /**
   * Get channel engagement analytics (daily views/comments)
   * @param channelId Channel ID
   */
  async getChannelEngagement(channelId: string) {
    const response = await axiosInstance.get(`/dashboard/engagement`, {
      params: { channelId }
    });
    return response.data;
  }

  /**
   * Get top videos for a channel
   * @param channelId Channel ID
   */
  async getTopVideos(channelId: string) {
    const response = await axiosInstance.get(`/dashboard/top-videos`, {
      params: { channelId }
    });
    return response.data;
  }
}

export default new DashboardService();
