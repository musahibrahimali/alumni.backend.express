import {Request, Response} from "express";
import {AuthService} from "../services/services";

const authService = new AuthService();

export class AuthController{
    constructor(){}
    // sign in
    public signIn(request:Request, response: Response){
        return authService.SignIn(request, response);
    }

    // sign up
    public signUp(request:Request, response: Response){
        return authService.SignUp(request, response);
    }

    // facebook login
    public facebookLogin(request:Request, response: Response){
        return authService.FacebookLogin(request, response);
    }

    // google login
    public googleLogin(request:Request, response: Response){
        return authService.GoogleLogin(request, response);
    }

    // log out
    public logOut(request:Request, response: Response){
        return authService.LogOut(request, response);
    }

}