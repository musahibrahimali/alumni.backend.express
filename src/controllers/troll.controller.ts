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
        bucketName: 'trollimages'
    });
});


export class TrollController{
    constructor(){}
    // get all trolls
    getAllTrolls = async (request: Request, response: Response) => {
        try{
            let trolls:any = [];
            // get all trolls
            const allTrolls = await TrollModel.find();
            for(let i = 0; i < allTrolls.length; i++){
                const troll = allTrolls[i];
                const trollMessage = troll.post;
                const trollImages = troll.images;
                const trollVideos = troll.videos;
                const trollLikes = troll.likes;
                const trollComments = troll.comments;
                const user = await UserModel.findOne({ _id: troll.user });
                let userData = null;
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
                const trollData = {
                    trollId: troll._id,
                    user: userData,
                    post: trollMessage,
                    images: trollImages,
                    videos: trollVideos,
                    likes: trollLikes,
                    comments: trollComments,
                };
                trolls.push(trollData);
            }
            // console.log(allTrolls);
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
        const {id} = request.body;
        
    }

    // add comment to troll
    addComment = async (request: Request, response: Response) => {
        const {id, comment} = request.body;
    }

    // update troll post likes
    updateLikes = async (request: Request, response: Response) => {
        const {id, user} = request.body;
        
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
        const {id} = request.body;
        try{
            await TrollModel.deleteOne({_id : id});
            return response.status(200).json({ message : "Deleted Successfully" });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // get troll images
    getTrollImages = async (request: Request, response: Response) => {
        const id = request.params.id;
        const _id = new mongoose.Types.ObjectId(id);
        try{
            imgGfs.find({ _id: _id }).toArray((err:any, files:any) => {
                if(err){
                    console.log(err);
                }
                if(files.length > 0){
                    const image:any = [];
                    // open download stream and add images to the images array
                    const readstream = imgGfs.openDownloadStream(_id);
                    // read buffer using stream
                    readstream.on('data', (chunk:any) => {
                        image.push(chunk);
                    });
                    readstream.on('error', () => {
                        console.log('error');
                    });
                    readstream.on('end', () => {
                        // convert buffer to bufferlist
                        const bufferList = new BufferList(image);
                        // convert the bufferlist to base64 string
                        const base64 = bufferList.toString('base64');
                        // add to images array
                        return response.status(200).json({ image : base64 });
                    });
                }
            });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // get troll videos
    getTrollVideos = async (request: Request, response: Response) => {
        const id = request.params.id;
        const _id = new mongoose.Types.ObjectId(id);
        try{
            vidGfs.find({ _id: _id }).toArray((err:any, files:any) => {
                if(err){
                    console.log(err);
                }
                if(files.length > 0){
                    const video:any = [];
                    // open download stream and add videos to the videos array
                    const readstream = vidGfs.openDownloadStream(_id);
                    // read buffer using stream
                    readstream.on('data', (chunk:any) => {
                        video.push(chunk);
                    });
                    readstream.on('error', () => {
                        console.log('error');
                    });
                    readstream.on('end', () => {
                        // convert buffer to bufferlist
                        const bufferList = new BufferList(video);
                        // convert the bufferlist to base64 string
                        const base64 = bufferList.toString('base64');
                        // add to videos array
                        return response.status(200).json({ video : base64 });
                    });
                }
            });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }
}