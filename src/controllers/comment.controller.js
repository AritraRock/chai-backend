import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import { Video } from "../models/video.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    if(!videoId) throw new ApiError(404,"No video found")

    const comments = await Comment.aggregate([
        {
            $match:{
                video:new mongoose.Types.ObjectId(videoId)
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
        // {
        //     $lookup:{
        //         from:"videos",
        //         localField:"video",
        //         foreignField:"_id",
        //         as:"video"
        //     },
        //     $project:{
        //         username:1,
        //         fullName:1,
        //         avatar:1,
        //     }
        // },
        {
            $unwind: "$owner"
        },
        {
            $project:{
                content:1,
                video:1,
                "owner.username": 1,
                "owner.fullName": 1,
                "owner.avatar": 1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: parseInt(limit, 10)
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,comments,"Got all comments"))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {content} = req.body;
    const {videoId} = req.params;

    // console.log(req.body,videoId)
    if(!content||!videoId) {
        throw new ApiError(401,"Comment content or Video ID missing")
    }

    const video = await Video.findById(videoId)

    if(!video) {
        throw new ApiError(404,"Video not found")
    }

    const comment = await Comment.create({
        content,
        video,
        owner: req.user
    })

    return res
    .status(200)
    .json(new ApiResponse(200,comment,"New comment added"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params;
    const {content} = req.body;

    // console.log(req.body,commentId)
    if(!commentId||!content) {
        throw new ApiError(401,"Invalid comment ID or missing content")
    }

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set:{
                content
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200,comment,"Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params;

    // console.log(req.body,commentId)
    if(!commentId) {
        throw new ApiError(401,"Invalid comment ID")
    }

    await Comment.findByIdAndDelete(commentId)

    return res
    .status(200)
    .json(new ApiResponse(200,"Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}