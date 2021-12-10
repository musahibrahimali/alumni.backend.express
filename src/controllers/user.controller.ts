import {Request, Response} from "express";
import {UserService} from "../services/services";

const userService = new UserService();

export class UserController{
    constructor(){}
    // sign in
    public signIn(request:Request, response: Response){
        return userService.SignIn(request, response);
    }

    // sign up
    public signUp(request:Request, response: Response){
        return userService.SignUp(request, response);
    }

    // facebook login
    public facebookLogin(request:Request, response: Response){
        return userService.FacebookLogin(request, response);
    }

    // google login
    public googleLogin(request:Request, response: Response){
        return userService.GoogleLogin(request, response);
    }

    public socialLogin(request:Request, response: Response){
        return userService.SocialLogin(request, response);
    }

    // log out
    public logOut(request:Request, response: Response){
        return userService.LogOut(request, response);
    }

}