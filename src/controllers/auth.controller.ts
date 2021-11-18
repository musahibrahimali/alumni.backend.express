import {Request, Response} from "express";
import {AuthService} from "../services/services";

const authService = new AuthService();

export class AuthController{
    constructor(){}

    public signIn(request:Request, response: Response){
        return authService.SignIn(request, response);
    }

    public signUp(request:Request, response: Response){
        return authService.SignUp(request, response);
    }

    public logOut(request:Request, response: Response){
        return authService.LogOut(request, response);
    }

}