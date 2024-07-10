import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    if (!req.user._id) throw new ApiError(404, "No user found");

    const userId = new mongoose.Types.ObjectId(req.user._id);

    const videoStats = await Video.aggregate([
        {
            $match: {
                owner: userId
            }
        },
        {
            $group: {
                _id: "$owner",
                totalVideoViews: { $sum: "$views" },
                totalVideos: { $sum: 1 }
            }
        }
    ]);

    const subscribers = await Subscription.aggregate([
        {
            $match: {
                channel: userId
            }
        },
        {
            $group: {
                _id: "$channel",
                totalSubscribers: { $sum: 1 }
            }
        }
    ]);

    const likes = await Like.aggregate([
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "video"
            }
        },
        {
            $unwind: "$video"
        },
        {
            $match: {
                "video.owner": userId
            }
        },
        {
            $group: {
                _id: null,
                totalLikes: { $sum: 1 }
            }
        }
    ]);

    const stats = {
        totalVideoViews: videoStats.length > 0 ? videoStats[0].totalVideoViews : 0,
        totalVideos: videoStats.length > 0 ? videoStats[0].totalVideos : 0,
        totalSubscribers: subscribers.length > 0 ? subscribers[0].totalSubscribers : 0,
        totalLikes: likes.length > 0 ? likes[0].totalLikes : 0
    };

    return res
        .status(200)
        .json(new ApiResponse(200, stats, "Fetched all stats for the current logged in user"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const channelId = req.user._id

    if(!channelId) throw new ApiError(404,"No channel found")

    const videos = await Video.aggregate([
        {
            $match:{
                owner: channelId
            }
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,videos,"Fetched all videos by the current logged in user"))
})

export {
    getChannelStats, 
    getChannelVideos
    }