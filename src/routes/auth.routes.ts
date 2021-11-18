import {Request, Response, Router} from "express";
import {AuthController} from "../controllers/controllers";

const router = Router();
const authController = new AuthController();

router.post("/login", (request:Request, response:Response) => {
    return authController.signIn(request, response);
});

router.post("/signup", (request:Request, response:Response) => {
    return authController.signUp(request, response);
});

router.get("/logout", (request:Request, response:Response) => {
    return authController.logOut(request, response);
});

export default router;