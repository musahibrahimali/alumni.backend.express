import {Request, Response} from "express";
import { BlogModel, EventModel, JobModel } from "../database/database";

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
    public Index(request: Request, response: Response) {
        const blogs = this._getAllBlogs();
        const events = this._getAllEvents();
        const jobs = this._getAllJobs();
        return response.status(200).send({blogs: blogs, events: events, jobs: jobs });
    }
}
