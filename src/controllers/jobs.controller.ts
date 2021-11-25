import { Request, Response } from "express";
import { JobsService } from '../services/services';

const jobsService = new JobsService();

export class JobsController{
    constructor(){}

    public getAllJobs(request:Request, response:Response){
        return jobsService.getAllJobs(request, response);
    }

    public getJobById(request:Request, response:Response){
        return jobsService.getJobById(request, response);
    }

    public getJobByTitle(request:Request, response:Response){
        return jobsService.getJobByTitle(request, response);
    }

    public createJob(request:Request, response:Response){
        return jobsService.createJob(request, response);
    }

    public updateJob(request:Request, response:Response){
        return jobsService.updateJob(request, response);
    }

    public deleteJob(request:Request, response:Response){
        return jobsService.deleteJob(request, response);
    }

}