import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/keys';
import {UserModel,SocialUserModel} from "../database/models/models";

export const requireAuth = (request:Request, response:Response, next:NextFunction) => {
    const token = request.cookies.jwt;

    // check if token is valid
    if (token) {
        jwt.verify(token, JWT_SECRET, (error:any, decodedToken: number|any) => {
            if (error) {
                // if the token is invalid, redirect to login
                response.redirect('/');
            } else {
                // @ts-ignore
                request.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        // if no token, redirect to login
        response.redirect('/');
    }
}

// check current user
export const checkUser = (request:Request, response:Response, next:NextFunction) => {
    const token = request.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, async (error:any, decodedToken: any) => {
            if (error) {
                response.locals.user = null;
                next();
            } else {
                // @ts-ignore
                request.decodedToken = decodedToken;
                const user = await UserModel.findById(decodedToken.id);
                const socialUser = await SocialUserModel.findById(decodedToken.id);
                if(user != null){
                    response.locals.user = user;
                }else{
                    response.locals.user = socialUser;
                }
                next();
            }
        });
    } else {
        response.locals.user = null;
        next();
    }
}

export const ensureAuth = (request:Request, response:Response, next:NextFunction) => {
    if (request.isAuthenticated()) {
        return next()
    } else {
        response.redirect('/')
    }
}
