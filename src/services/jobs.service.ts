import { Request, Response } from "express";
import { JobModel } from "../database/database";

export class JobsService{
    constructor(){}

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

    createJob = async (request:Request, response:Response) => {
        const { title, url, snippet, details, date, logo } = request.body;
        try{
            const job = await JobModel.create({
                title : title,
                url : url,
                snippet : snippet,
                details : details,
                date : date,
                logo : logo,
            });
            return response.status(200).json({ eventId : job._id });
        }catch(error){
            return response.status(400).json({ error });
        }
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
