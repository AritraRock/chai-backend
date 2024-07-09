import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    // const userId = req.user._id

    // if(!userId) throw new ApiError(404,"No user found")

    // const channel = await
})

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
    .json(new ApiResponse(200,videos,"All videos by the current logged in user"))
})

export {
    getChannelStats, 
    getChannelVideos
    }