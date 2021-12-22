import { Request, Response } from "express";
import { TrollModel } from '../models/models';
import { UserModel } from '../models/user/user.model';
import mongoose from 'mongoose';
import config from "../config/config";
import BufferList from "bl/BufferList";

const database = mongoose.createConnection(config.mongodb.DB_URL);
let imgGfs:any;
let vidGfs:any;

database.once('open', () => {
    imgGfs = new mongoose.mongo.GridFSBucket(database.db, {
        bucketName: 'trollimages'
    });
    vidGfs = new mongoose.mongo.GridFSBucket(database.db, {
        bucketName: 'trollvideos'
    });
});

const findUser = async (userId:string) => {
    let userData = null;
    const user = await UserModel.findById(userId);
    if(user){
        userData = {
            userId: user._id,
            socialId: user.socialId,
            displayName: user.displayName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
        }
    }
    return userData;
}

// get troll image
const getImage = async (_id:any) => {
    // find the image, read it in chunks and return the buffer
    const readStream = imgGfs.openDownloadStream(_id);
    const bufferList = new BufferList();
    readStream.on('data', (chunk:any) => {
        bufferList.append(chunk);
    });
    return new Promise((resolve, reject) => {
        readStream.on('end', () => {
            resolve(bufferList);
        });
    });
}

// get troll video
const getVideo = async (_id:any) => {
    // find the image, read it in chunks and return the buffer
    const readStream = vidGfs.openDownloadStream(_id);
    const bufferList = new BufferList();
    readStream.on('data', (chunk:any) => {
        bufferList.append(chunk);
    });
    return new Promise((resolve, reject) => {
        readStream.on('end', () => {
            resolve(bufferList);
        });
    });
}

export class TrollController{
    constructor(){}
    // get all trolls
    getAllTrolls = async (request: Request, response: Response) => {
        try{
            let trolls:any = [];
            let images:any = [];
            let videos:any = [];
            // get all trolls
            const allTrolls = await TrollModel.find();
            // get all troll image ids
            const trollImgIds = allTrolls.map(troll => {
                const imgDt = {
                    id: troll._id,
                    imgIds: troll.images
                }
                return imgDt;
            });
            // get all troll video ids
            const trollVidIds = allTrolls.map(troll => {
                const vidDt = {
                    id: troll._id,
                    vidIds: troll.videos
                }
                return vidDt;
            });

            // get all troll images with their ids
            for(let i = 0; i < trollImgIds.length; i++){
                const imgIds = trollImgIds[i].imgIds;
                const trollId = trollImgIds[i].id;
                for(let j = 0; j < imgIds.length; j++){
                    const imgId = imgIds[j];
                    const _id = new mongoose.Types.ObjectId(imgId);
                    const image:any = await getImage(_id);
                    // convert the buffer to base64
                    const base64Image = image.toString('base64');
                    // convert the base64 string to image format
                    const imageFormat = 'data:image/png;base64,' + base64Image;
                    const imgData = {
                        trollId: trollId,
                        imgId: imgId,
                        img: imageFormat
                    }
                    // add the image to the images array
                    images.push(imgData);
                }
            }

            // get all troll videos with their ids
            for(let i = 0; i < trollVidIds.length; i++){
                const vidIds = trollVidIds[i].vidIds;
                const trollId = trollVidIds[i].id;
                for(let j = 0; j < vidIds.length; j++){
                    const vidId = vidIds[j];
                    const _id = new mongoose.Types.ObjectId(vidId);
                    const video:any = await getVideo(_id);
                    // convert the buffer to base64
                    const base64Video = video.toString('base64');
                    // convert the base 64 string to video format
                    const videoFormat = 'data:video/mp4;base64,' + base64Video;
                    const vidData = {
                        trollId: trollId,
                        vidId: vidId,
                        vid: videoFormat
                    }
                    // add the video to the videos array
                    videos.push(vidData);
                }
            }

            // construct data to send to client
            for(let i = 0; i < allTrolls.length; i++){
                const troll = allTrolls[i];
                const trollMessage = troll.post;
                const trollLikes = troll.likes;
                const trollComments = troll.comments;
                const trollShares = troll.shares;
                let userData = await findUser(troll.user);

                // find all troll images from the images array with the troll id
                const trollImages = images.filter((img:any) => img.trollId === troll._id);
                // find all troll videos from the videos array with the troll id
                const trollVideos = videos.filter((vid:any) => vid.trollId === troll._id);
                const trollData = {
                    trollId: troll._id,
                    user: userData,
                    post: trollMessage,
                    images: trollImages,
                    videos: trollVideos,
                    likes: trollLikes,
                    comments: trollComments,
                    shares: trollShares,
                    createdAt: troll.createdAt,
                    updatedAt: troll.updatedAt
                };
                trolls.push(trollData);
            }
            // sort trolls based on last updated
            trolls.sort((a:any, b:any) => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
            return response.status(200).json({ trolls : trolls });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // create troll
    createTroll = async (request: Request, response: Response) => {
        const {userId, post} = request.body;
        const fileData:any = request.files;
        const imageIds:string[] = [];
        const videoIds:string[] = [];
        try{
            // get id of images and videos from request and add it to the images array
            // @ts-ignore
            if(fileData.images){
                for(let i = 0; i < fileData.images.length; i++){
                    const image = fileData.images[i];
                    imageIds.push(image.id);
                }
            }
            // get all the video ids and add it to the videos array
            // @ts-ignore
            if(fileData.videos){
                for(let i = 0; i < fileData.videos.length; i++){
                    const video = fileData.videos[i];
                    videoIds.push(video.id);
                }
            }
            // create a new troll
            const newTroll = new TrollModel({
                post: post,
                user: userId,
                images: imageIds,
                videos: videoIds,
                likes: [],
                comments: [],
                shares: []
            });
            // console.log(JSON.stringify(newTroll));
            // save the troll
            const troll = await newTroll.save();
            return response.status(200).json({ troll : troll });
        }catch(error){
            console.log(error);
            return response.status(400).json({ errors : error });
        }
    }

    // update troll post
    updateTroll = async (request: Request, response: Response) => {
        const {userId, postId} = request.body;
        try{
            
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // add comment to troll
    addComment = async (request: Request, response: Response) => {
        const {userId, postId, comment} = request.body;
        try{
            // find the user 
            const user = await findUser(userId);
            // get troll
            const troll = await TrollModel.findOne({_id: postId});
            // add comment to troll
            troll.comments.push({
                user: user,
                comment: comment
            });
            // save the troll
            const updatedTroll = await troll.save();
            return response.status(200).json({ troll : updatedTroll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // update troll post likes
    updateLikes = async (request: Request, response: Response) => {
        const {userId, postId} = request.body;
        try{
            // find user
            const user = await findUser(userId);
            // find troll by id
            const troll = await TrollModel.findOne({_id : postId});
            if(troll){
                // add user to the likes array
                troll.likes.push({
                    user: user
                });
            }
            // save the troll
            const updatedTroll = await troll.save();
            return response.status(200).json({ troll : updatedTroll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // update shares
    updateShares = async (request: Request, response: Response) => {
        const {userId, postId} = request.body;
        try{
            // find user
            const user = await findUser(userId);
            // find troll by id
            const troll = await TrollModel.findOne({_id : postId});
            if(troll){
                // update the shares array with the user id
                troll.shares.push({
                    user: user
                });
            }
            // save the troll
            const updatedTroll = await troll.save();
            return response.status(200).json({ troll : updatedTroll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }


    // get troll by id
    getTrollById = async (request: Request, response: Response) => {
        const id = request.params.id;
        try{
            const troll = await TrollModel.findById({_id: id});
            return response.status(200).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }


    // delete troll post
    deleteTroll = async (request: Request, response: Response) => {
        const {trollId} = request.body;
        try{
            await TrollModel.deleteOne({_id : trollId});
            return response.status(200).json({ message : "Deleted Successfully" });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }
}