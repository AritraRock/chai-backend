import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist
    if(!name||!description){
        throw new ApiError(401,"No name or description")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner:req.user._id
    })

    return res
    .status(200)
    .json(new ApiResponse( 200,playlist,"New playlist created"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if(!userId){
        throw new ApiError(401,"No userId is provided")
    }

    const playlist = await Playlist.aggregate([
            {
                $match:{
                    owner:new mongoose.Types.ObjectId(userId)
                }
            }
    ])

    return res
    .status(200)
    .json(new ApiResponse( 200,playlist,"Fetched the playlist"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id

    if(!playlistId){
        throw new ApiError(401,"No playlist is provided")
    }

    const playlist = await Playlist.findById(playlistId)

    return res
    .status(200)
    .json(new ApiResponse( 200,playlist,"Fetched the playlist"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!playlistId||!videoId){
        throw new ApiError(401,"No playlist or videoId is provided")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push:{
                videos:videoId
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(new ApiResponse( 200,playlist,"Video added to the playlist"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    if(!playlistId||!videoId){
        throw new ApiError(401,"No playlist or videoId is provided")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull:{
                videos:videoId
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200,playlist,"Video removed to the playlist"))

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!playlistId){
        throw new ApiError(401,"No playlist is provided")
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId)

    return res
    .status(200)
    .json(new ApiResponse( 200,playlist,"Playlist is deleted"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if(!playlistId||!name||!description){
        throw new ApiError(401,"No playlist or name or description is provided")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
                name,
                description
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(new ApiResponse( 200,playlist,"Playlist updated successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}