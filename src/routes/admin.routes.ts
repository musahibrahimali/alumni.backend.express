import {Request, Response, Router} from 'express';
import { AdminController } from "../controllers/admin.controller";

const router = Router();
const adminController = new AdminController();

router.get('/dashboard', (request:Request, response:Response) => {
    return response.send('admin/dashboard');
});

router.post('/login', (request:Request, response:Response) => {
    return adminController.SignInAdmin(request, response);
});

router.post('/signup', (request:Request, response:Response) => {
    return adminController.RegisterAdmin(request, response);
});

router.get('/initial/:id', (request:Request, response:Response) => {
    return adminController.GetInitialAdmin(request, response);
});

router.get('/logout', (request:Request, response:Response) => {
    return adminController.LogOutAdmin(request, response);
});


export default router;