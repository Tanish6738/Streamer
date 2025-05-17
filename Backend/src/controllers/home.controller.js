import { videoModel } from '../models/Video.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';

// Get featured videos (e.g., trending or most viewed)
export const getFeaturedVideos = asyncHandler(async (req, res) => {
  // Example: Get top 8 most viewed published videos
  const videos = await videoModel.find({ isPublished: true })
    .sort({ views: -1 })
    .limit(8)
    .select('title thumbnailUrl views owner channelName')
    .lean();

  return res.status(200).json(videos);
});
