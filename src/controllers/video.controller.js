import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary, deleteSingleFromCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    // console(req)
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    const videoLocalPath = req.files['videoFile'][0]?.path
    const thumbnailLocalPath = req.files['thumbnail'][0]?.path

    if(!videoLocalPath&&!thumbnailLocalPath){
        throw new ApiError(400," Video or thumbnail file is missing")
    }

    const videofile = await uploadOnCloudinary(videoLocalPath);
    // console.log("Video :",videofile)
    if(!videofile.url){
        throw new ApiError(401, "Error while uploading the video")
    }

    const thumbnailfile = await uploadOnCloudinary(thumbnailLocalPath);
    // console.log("thumbnail :",thumbnailfile)
    if(!thumbnailfile.url){
        throw new ApiError(401, "Error while uploading the thumbnail")
    }

    const video = await Video.create({
        videoFile: videofile.url,
        thumbnail: thumbnailfile.url,
        title,
        description,
        duration:videofile.duration,
        owner: req.user
    })

    return res
    .status(200)
    .json(new ApiResponse (200,video,"Video and thumbnail is published successfully"))

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $inc:{
                views: 1,
            }
        },
        {new: true}
    ).populate({
        path: "owner",
        select: "-password -refreshToken"
    })

    if(!video){
        throw new ApiError(404,"Video not found")
    }
    
    // const videoWithOwner = await Video.aggregate([
    //     {
    //         $lookup:{
    //             from: "users",
    //             localField:"owner",
    //             foreignField:"_id",
    //             as: "owner"
    //         },
    //     },
    //     { $unwind: "$owner" },
    //     {
    //         $project:{
    //             videoFile:1,
    //             thumbnail:1,
    //             title:1,
    //             description:1,
    //             duration:1,
    //             views:1,
    //             "owner.username":1,
    //             "owner.fullName":1,
    //             "owner.avatar":1,
    //         }

    //     }
    // ])

    
    return res
    .status(200)
    .json(new ApiResponse(200,video,"Video found"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    const {title, description}= req.body;
    const thumbnailLocalPath= req.file?.path
    
    if(!title||!description||!thumbnailLocalPath) throw new ApiError(401,"Provide all inputs")

    const oldVideo = await Video.findById(videoId);
    if (!oldVideo) {
        throw new ApiError(404, "Video not found");
    }
    const oldThumbnailPath = oldVideo.thumbnail.split("/").pop().replace(".jpg","")
    
    console.log("oldThumbnailPath: ",oldThumbnailPath)
    if(oldThumbnailPath) {
        const deleted = await deleteSingleFromCloudinary(oldThumbnailPath)
        console.log(deleted)
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set:{
                title,
                description,
                thumbnail:thumbnail.url
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200,video,"Title, description and thumbnail updated successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}