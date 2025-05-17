import * as axios from '../Config/Axios';

const HomeService = {
  /**
   * Get featured videos for the home page
   * @returns Promise with featured videos array
   */
  async getFeaturedVideos() {
    const response = await axios.default.get('/home/featured-videos');
    return response.data;
  },

  /**
   * Get all public (published) videos for the home page
   * @returns Promise with public videos array
   */
  async getPublicVideos() {
    // Fetch all videos with isPublished=true
    const response = await axios.default.get('/videos?isPublished=true');
    return response.data;
  },
};

export default HomeService;
