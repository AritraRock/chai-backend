import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body;
    if(!content) throw new ApiError(401,"No content to create the tweet")
    
    const tweet = await Tweet.create(
        {
            content,
            owner:req.user
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200,tweet,"New tweet created"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const {userId} = req.params;

    if(!userId) {
        throw new ApiError(404,"No UserID found")
    }

    const tweets = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $sort: {
                createdAt: -1 // Assuming you want to sort by creation date, most recent first
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner"
            }
        },
        {
            $project: {
                content: 1,
                "owner.username": 1,
                "owner.fullName": 1,
                "owner.avatar": 1,
                createdAt: 1
            }
        }
    ]);

    // tweets.owner=req.user;

    return res
    .status(200)
    .json(new ApiResponse(200,tweets,"Got all tweets from user:",userId))

})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params;
    const {content} = req.body;

    if(!tweetId||!content){
        throw new ApiError(404,"content missing or No tweet with ID:",tweetId)
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set:{
                content
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200,tweet,"Tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params;

    if(!tweetId){
        throw new ApiError(404,"No tweet with ID:",tweetId)
    }

    await Tweet.findByIdAndDelete(tweetId)

    return res
    .status(200)
    .json(new ApiResponse(200,"Tweet deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}