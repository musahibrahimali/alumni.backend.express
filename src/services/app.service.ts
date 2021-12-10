import {Request, Response} from "express";
import { BlogModel, EventModel, JobModel, SocialUserModel, UserModel } from "../database/database";

export class AppService{
    constructor() {}
    // return all available blogs
    _getAllBlogs = async () => {
        return await BlogModel.find();
    }
    // return all available jobs
    _getAllJobs = async () => {
        return await JobModel.find();
    }

    // return all available events
    _getAllEvents = async () => {
        return await EventModel.find();
    }
    // home page end point
    Index = async (request: Request, response: Response) => {
        const blogs = this._getAllBlogs();
        const events = this._getAllEvents();
        const jobs = this._getAllJobs();
        return response.status(200).send({blogs: blogs, events: events, jobs: jobs });
    }

    GetInitialUser = async (request: Request, response: Response) => {
        const {id} = request.params;
        const user = await UserModel.findOne({_id: id});
        const socialUser = await SocialUserModel.findOne({_id: id});
        if(user){
            const data = {
                userId: user._id,
                email: user.email,
                displayName: user.displayName,
                firstName: user.firstName,
                lastName: user.lastName,
                image : user.image,
            }
            return response.status(200).json({ data: data });
        }else if(socialUser){
            const data = {
                userId: socialUser._id,
                email: socialUser.email,
                displayName: socialUser.displayName,
                firstName: socialUser.firstName,
                lastName: socialUser.lastName,
                image : socialUser.image,
            }
            return response.status(200).json({ data: data });
        }else{
            return response.status(400).json({ message: "User not found" });
        }
    }
}
