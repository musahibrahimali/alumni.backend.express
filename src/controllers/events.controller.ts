import { Request, Response } from "express";
import { EventModel } from "../models/models";
import { UserModel } from '../models/user/user.model';
import mongoose from 'mongoose';
import config from "../config/config";
import BufferList from "bl/BufferList";

const database = mongoose.createConnection(config.mongodb.DB_URL);
let imgGfs:any;
let vidGfs:any;

database.once('open', () => {
    imgGfs = new mongoose.mongo.GridFSBucket(database.db, {
        bucketName: 'eventimages',
    });
    vidGfs = new mongoose.mongo.GridFSBucket(database.db, {
        bucketName: 'eventvideos',
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

export class EventsController{
    constructor(){}

    createEvent = async (request:Request, response:Response) => {
        const fileData:any = request.files;
        const { 
            eventTitle, 
            eventDescription,
            eventSnippet, 
            eventDate, 
            eventTime, 
            eventVenue, 
            guests,
        } = request.body;
        
        try{
            const imageIds:string[] = [];
            const videoIds:string[] = [];

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

            const event = new EventModel({
                title : eventTitle,
                snippet : eventSnippet,
                details : eventDescription,
                venue: eventVenue,
                date : eventDate,
                time: eventTime,
                images : imageIds,
                videos: videoIds,
                guest: guests,
            });
            const newEvent = await event.save();
            return response.status(200).json({ eventId : newEvent._id });
        }catch(error){
            return response.status(400).json({ error });
        }
    }

    getAllEvents = async (request:Request, response:Response) => {
        try{
            const events = await EventModel.find();
            return response.status(200).json({ events: events });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    getEventById = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            const event = await EventModel.findById({_id : id });
            return response.status(200).json({ event: event });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    getEventByTitle = async (request:Request, response:Response) => {
        const {title} = request.body;
        const event = await EventModel.findOne({ title : title });
        return response.status(200).json({ event: event });
    }

    updateEvent = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            const event = EventModel.findByIdAndUpdate({_id : id},{});
            return response.status(200).json({event: event });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    deleteEvent = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            await EventModel.deleteOne({_id : id});
            return response.status(200).json({ message: "Deleted Successfully" });

        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

}