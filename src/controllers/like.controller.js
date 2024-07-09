import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user._id
    //TODO: toggle like on video
    if(!videoId||!userId){
        throw new ApiError(404,"No video or no user found")
    }
    
    const like = await Like.findOneAndDelete({
        video:videoId,
        likedBy:userId
    })

    if(like){
        //like already existed and deleted
        return res
        .status(200)
        .json(new ApiResponse(200,null,"Like removed from the video"))
    }

    //like doesn't exit and have to create new like
    const createdLike = await Like.create({
        video:videoId,
        likedBy:userId
    })

    createdLike.likedBy=req.user

    return res
    .status(200)
    .json(new ApiResponse(200,createdLike,"Like added on the video"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    const userId = req.user._id
    if(!commentId||!userId){
        throw new ApiError(404,"No comment or no user found")
    }
    
    const like = await Like.findOneAndDelete({
        comment:commentId,
        likedBy:userId
    })

    if(like){
        //like already existed and deleted
        return res
        .status(200)
        .json(new ApiResponse(200,null,"Like removed from the comment"))
    }

    //like doesn't exit and have to create new like
    const createdLike = await Like.create({
        comment:commentId,
        likedBy:userId
    })

    createdLike.likedBy=req.user

    return res
    .status(200)
    .json(new ApiResponse(200,createdLike,"Like added on the comment"))

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const userId = req.user._id
    if(!tweetId||!userId){
        throw new ApiError(404,"No tweet or no user found")
    }
    
    const like = await Like.findOneAndDelete({
        tweet:tweetId,
        likedBy:userId
    })

    if(like){
        //like already existed and deleted
        return res
        .status(200)
        .json(new ApiResponse(200,null,"Like removed from the tweet"))
    }

    //like doesn't exit and have to create new like
    const createdLike = await Like.create({
        tweet:tweetId,
        likedBy:userId
    })

    createdLike.likedBy=req.user

    return res
    .status(200)
    .json(new ApiResponse(200,createdLike,"Like added on the tweet"))
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedBy = req.user._id
    if(!likedBy){
        throw new ApiError(404,"No owner found")
    }

    const videos = await Like.aggregate([
        {
            $match:{
                likedBy: new mongoose.Types.ObjectId(likedBy),
                video:{
                    $exists:true
                }
            }
        },
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,videos,"Fetched all liked videos"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}