import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    if(!channelId){
        throw new ApiError(404,"No channel Id found")
    }

    const subscription = await Subscription.findOneAndDelete({
        subscriber:req.user._id,
        channel:channelId
    })

    if(!subscription){
        const newSubscription = await Subscription.create({
            subscriber:req.user._id,
            channel:channelId
        })
        return res
        .status(200)
        .json(new ApiResponse(200,newSubscription,`${req.user.username} subscribed to ${channelId}`))
    }

    return res
    .status(200)
    .json(new ApiResponse(200,subscription,`${req.user.username} unsubscribed to ${channelId}`))
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!channelId){
        throw new ApiError(404,"No channel Id found")
    }

    const subscribers = await Subscription.aggregate([
        {
            $match:{
                channel:new mongoose.Types.ObjectId(channelId)
            }
        },
    ])

    
    return res
    .status(200)
    .json(new ApiResponse(200,subscribers,"Successfully fetched all subscribers"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if(!subscriberId){
        throw new ApiError(404,"No user found")
    }

    const subscribedChannels = await Subscription.aggregate([
        {
            $match:{
                subscriber:new mongoose.Types.ObjectId(subscriberId)
            }
        },
    ])

    
    return res
    .status(200)
    .json(new ApiResponse(200,subscribedChannels,"Successfully fetched all subscribed channels"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}