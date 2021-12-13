import {Request, Response, Router} from "express";
import {AppController} from "../controllers/controllers";

const router = Router();
const appController = new AppController();

router.get("/", (request:Request, response:Response) => {
    return appController.Index(request, response);
});

export default router;