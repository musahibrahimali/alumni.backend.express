import {Request, Response} from "express";
import {AdminService} from "../services/admin.service";

const adminService = new AdminService();

export class AdminController{
    constructor(){}

    public register_admin(request:Request, response:Response){
        return adminService.RegisterAdmin(request, response);
    }

    public login_admin(request:Request, response:Response){
        return adminService.SignInAdmin(request, response);
    }

    public find_initial_admin(request:Request, response:Response){
        return adminService.GetInitialAdmin(request, response);
    }

    public logout_admin(request:Request, response:Response){
        return adminService.LogOutAdmin(request, response);
    }
    
}