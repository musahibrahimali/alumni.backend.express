import {Request, Response, Router} from "express";
import {AppController} from "../controllers/controllers";
import {checkUser, requireAuth} from "../middleware/middlewares";

const router = Router();
const appController = new AppController();

router.get("/", (request:Request, response:Response) => {
    return appController.home_page(request, response);
});

router.get('/initialuser/:id', (request:Request, response:Response) => {
    return appController.initial_user(request, response);
});

export default router;