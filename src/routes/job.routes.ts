import { Request, Response, Router } from "express";
import { JobsController } from "../controllers/controllers";

const router = Router();
const jobsController = new JobsController();

router.post('/jobs', (request:Request, response:Response) => {
    return jobsController.createJob(request, response);
});

router.post('/jobs:id', (request:Request, response:Response) => {
    return jobsController.updateJob(request, response);
});

router.post('/jobs', (request:Request, response:Response) => {
    return jobsController.deleteJob(request, response);
});

router.get('/jobs', (request:Request, response:Response) => {
    return jobsController.getAllJobs(request, response);
});

router.get('/jobs:id', (request:Request, response:Response) => {
    return jobsController.getJobById(request, response);
});

router.get('/jobs:title', (request:Request, response:Response) => {
    return jobsController.getJobByTitle(request, response);
});

export default router;
