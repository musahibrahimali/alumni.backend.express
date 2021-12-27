import { Request, Response } from "express";
import { JobModel } from "../models/models";
import { UserModel } from '../models/user/user.model';
import mongoose from 'mongoose';
import config from "../config/config";
import BufferList from "bl/BufferList";

const database = mongoose.createConnection(config.mongodb.DB_URL);
let imgGfs:any;

database.once('open', () => {
    imgGfs = new mongoose.mongo.GridFSBucket(database.db, {
        bucketName: 'jobimages',
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

export class JobsController{
    constructor(){}

    createJob = async (request:Request, response:Response) => {
        const fileData:any = request.files;
        const { 
            jobTitle, 
            jobDescription,
            jobSnippet, 
            expireDate, 
            jobLocation,
            companyLogo,
            companyUrl,
        } = request.body;
        try{
            const imageIds:string[] = [];
            // get id of images and videos from request and add it to the images array
            // @ts-ignore
            if(fileData.images){
                for(let i = 0; i < fileData.images.length; i++){
                    const image = fileData.images[i];
                    imageIds.push(image.id);
                }
            }

            const job = new JobModel({
                title : jobTitle,
                url : companyUrl,
                snippet : jobSnippet,
                details : jobDescription,
                location: jobLocation,
                expireDate : expireDate,
                logo : companyLogo,
                images: imageIds,
            });
            const newJob = await job.save();
            return response.status(200).json({ eventId : newJob._id });
        }catch(error){
            return response.status(400).json({ error });
        }
    }

    getAllJobs = async (request:Request, response:Response) => {
        try{
            const jobs = await JobModel.find();
            return response.status(200).json({ jobs: jobs });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    getJobById = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            const job = await JobModel.findById({_id : id });
            return response.status(200).json({ job: job });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    getJobByTitle = async (request:Request, response:Response) => {
        const {title} = request.body;
        const job = await JobModel.findOne({ title : title });
        return response.status(200).json({ job: job });
    }

    updateJob = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            const job = JobModel.findByIdAndUpdate({_id : id},{});
            return response.status(400).json({job: job });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    deleteJob = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            await JobModel.deleteOne({_id : id});
            return response.status(200).json({ message: "Deleted Successfully" });

        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

}