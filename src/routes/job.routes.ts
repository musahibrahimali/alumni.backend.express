import { Request, Response, Router } from "express";
import { JobsController } from "../controllers/controllers";

const router = Router();
const jobsController = new JobsController();

// create job
router.post('/jobs', (request:Request, response:Response) => {
    return jobsController.createJob(request, response);
});

// get all jobs
router.get('/jobs', (request:Request, response:Response) => {
    return jobsController.getAllJobs(request, response);
});

// get job by id
router.get('/jobs:id', (request:Request, response:Response) => {
    return jobsController.getJobById(request, response);
});


// get job by title
router.get('/jobs:title', (request:Request, response:Response) => {
    return jobsController.getJobByTitle(request, response);
});

// update job
router.put('/jobs:id', (request:Request, response:Response) => {
    return jobsController.updateJob(request, response);
});

// delete job
router.delete('/jobs/:id', (request:Request, response:Response) => {
    return jobsController.deleteJob(request, response);
});


export default router;