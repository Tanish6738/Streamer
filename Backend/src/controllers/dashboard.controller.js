import mongoose, { isValidObjectId } from "mongoose";
import { likeModel } from "../models/likes.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import  asyncHandler from "../../utils/asyncHandler.js";
import { subscriptionModel } from "../models/Subscription.model.js";
import { videoModel } from "../models/Video.model.js";
import { commentModel } from "../models/comment.model.js";

// Utility: Pagination helper
function getPagination(query) {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(query.limit) || 10));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}

// Utility: Analytics helper (example: trending videos)
async function getTrendingVideos(limit = 5) {
    return videoModel.find({ isPublished: true })
        .sort({ views: -1, createdAt: -1 })
        .limit(limit)
        .select("title thumbnail views owner createdAt")
        .populate("owner", "username avatar");
}

const getChannelStats = asyncHandler(async (req, res) => {
    const { channelId } = req.query;
    if (!channelId || !isValidObjectId(channelId)) {
        return res.status(400).json(new ApiResponse(400, "Invalid or missing channel ID"));
    }
    try {
        // Aggregate stats
        const statsRawArr = await videoModel.aggregate([
            { $match: { owner: new mongoose.Types.ObjectId(channelId) } },
            {
                $group: {
                    _id: "$owner",
                    totalViews: { $sum: "$views" },
                    totalVideos: { $sum: 1 },
                    totalLikes: { $sum: "$likes" }
                }
            }
        ]);
        
        const stats = statsRawArr[0] || { totalViews: 0, totalVideos: 0, totalLikes: 0 };
        // Subscriber count
        const totalSubscribers = await subscriptionModel.countDocuments({ channel: channelId });
        // Recent videos
        const recentVideos = await videoModel.find({ owner: channelId, isPublished: true })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title thumbnail views createdAt");
        // Trending videos (site-wide)
        const trendingVideos = await getTrendingVideos(5);
        return res.status(200).json(new ApiResponse(200, "Channel stats fetched successfully", {
            totalViews: stats.totalViews || 0,
            totalVideos: stats.totalVideos || 0,
            totalLikes: stats.totalLikes || 0,
            totalSubscribers,
            recentVideos,
            trendingVideos
        }));
    } catch (err) {
        console.error("Error in getChannelStats:", err);
        return res.status(200).json(new ApiResponse(200, "Channel stats fetched successfully", {
            totalViews: 0,
            totalVideos: 0,
            totalLikes: 0,
            totalSubscribers: 0,
            recentVideos: [],
            trendingVideos: []
        }));
    }
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const { channelId } = req.query;
    if (!channelId || !isValidObjectId(channelId)) {
        return res.status(400).json(new ApiResponse(400, "Invalid or missing channel ID"));
    }
    let { page, limit, skip } = getPagination(req.query);
    // Defensive: ensure numbers
    page = Number.isFinite(page) && page > 0 ? page : 1;
    limit = Number.isFinite(limit) && limit > 0 ? limit : 10;
    skip = Number.isFinite(skip) && skip >= 0 ? skip : 0;
    // Search and sort support
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "createdAt";
    const sortType = req.query.sortType === "asc" ? 1 : -1;
    const match = {
        owner: new mongoose.Types.ObjectId(channelId),
        isPublished: true,
        ...(search && { title: { $regex: search, $options: "i" } })
    };
    let videos = [];
    let total = 0;
    try {
        // Defensive: check sortBy is a valid field
        const allowedSortFields = ["createdAt", "views", "likes", "title"];
        const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
        videos = await videoModel.find(match)
            .sort({ [safeSortBy]: sortType })
            .skip(Number.isFinite(skip) ? skip : 0)
            .limit(Number.isFinite(limit) ? limit : 10)
            .populate("owner", "username avatar")
            .select("title thumbnail views likes createdAt");
        total = await videoModel.countDocuments(match);
    } catch (err) {
        console.error("Error in getChannelVideos:", err);
        return res.status(200).json(new ApiResponse(200, "Channel videos fetched successfully", {
            videos: [],
            page,
            limit,
            totalPages: 0,
            total: 0
        }));
    }
    return res.status(200).json(new ApiResponse(200, "Channel videos fetched successfully", {
        videos: videos || [],
        page,
        limit,
        totalPages: Math.ceil((total || 1) / (limit || 1)),
        total: total || 0
    }));
});

// New: Get channel engagement analytics (likes, comments, views over time)
const getChannelEngagement = asyncHandler(async (req, res) => {
    const { channelId } = req.query;
    if (!channelId || !isValidObjectId(channelId)) {
        return res.status(400).json(new ApiResponse(400, "Invalid or missing channel ID"));
    }
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    let dailyViews = [];
    let dailyComments = [];
    try {
        // Daily views
        dailyViews = await videoModel.aggregate([
            { $match: { owner: mongoose.Types.ObjectId(channelId), createdAt: { $gte: thirtyDaysAgo } } },
            { $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                views: { $sum: "$views" }
            } },
            { $sort: { _id: 1 } }
        ]);
        // Daily comments (only for this channel's videos)
        let channelVideoIds = [];
        try {
            channelVideoIds = await videoModel.find({ owner: channelId }).distinct('_id');
        } catch (err) {
            channelVideoIds = [];
        }
        if (Array.isArray(channelVideoIds) && channelVideoIds.length > 0) {
            dailyComments = await commentModel.aggregate([
                { $match: { video: { $in: channelVideoIds }, createdAt: { $gte: thirtyDaysAgo } } },
                { $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    comments: { $sum: 1 }
                } },
                { $sort: { _id: 1 } }
            ]);
        } else {
            dailyComments = [];
        }
    } catch (err) {
        console.error("Error in getChannelEngagement:", err);
        return res.status(200).json(new ApiResponse(200, "Channel engagement analytics fetched successfully", { dailyViews: [], dailyComments: [] }));
    }
    return res.status(200).json(new ApiResponse(200, "Channel engagement analytics fetched successfully", { dailyViews, dailyComments }));
});

// New: Get top videos for a channel
const getTopVideos = asyncHandler(async (req, res) => {
    const { channelId } = req.query;
    if (!channelId || !isValidObjectId(channelId)) {
        return res.status(400).json(new ApiResponse(400, "Invalid or missing channel ID"));
    }
    const topVideos = await videoModel.find({ owner: channelId, isPublished: true })
        .sort({ views: -1 })
        .limit(10)
        .select("title thumbnail views likes createdAt");
    return res.status(200).json(new ApiResponse(200, "Top videos fetched successfully", topVideos));
});

export {
    getChannelStats,
    getChannelVideos,
    getChannelEngagement,
    getTopVideos
};