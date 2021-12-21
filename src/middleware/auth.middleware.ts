import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import {UserModel} from "../models/models";

const clientUrl = config.origin.CLIENT_URL.toString() + "/members";

export const requireAuth = (request:Request, response:Response, next:NextFunction) => {
    let token = "";
    const rawCookies = request.headers.cookie;
    if(rawCookies){
        const cookies = rawCookies.split('; ');
        cookies.forEach((cookie) => {
            const parsedcookie = cookie.split("=");
            const _key = parsedcookie[0];
            const _value = parsedcookie[1];
            if(_key === 'jwt'){
                token = _value.toString();
            }
        });

        // check if token is valid
        if (token) {
            jwt.verify(token, config.session.JWT_SECRET, (error:any, decodedToken: number|any) => {
                if (error) {
                    // if the token is invalid, redirect to login
                    response.redirect(clientUrl);
                } else {
                    // @ts-ignore
                    request.decodedToken = decodedToken;
                    const userId = decodedToken.id;
                    // find user in both UserModel and SocialModel
                    const user = UserModel.findById(userId);
                    if(user != null){
                        response.locals.user = user;
                    }
                    next();
                }
            });
        } else {
            // if no token, redirect to login
            response.redirect(clientUrl);
        }
    }
}

// check current user
export const checkUser = (request:Request, response:Response, next:NextFunction) => {
    let token = "";
    const rawCookies = request.headers.cookie;
    if(rawCookies){
        const cookies = rawCookies.split('; ');
        cookies.forEach((cookie) => {
            const parsedcookie = cookie.split("=");
            const _key = parsedcookie[0];
            const _value = parsedcookie[1];
            if(_key === 'jwt'){
                token = _value.toString();
            }
        });
        
        if (token) {
            jwt.verify(token, config.session.JWT_SECRET, async (error:any, decodedToken: any) => {
                if (error) {
                    response.locals.user = null;
                    next();
                } else {
                    // @ts-ignore
                    request.decodedToken = decodedToken;
                    const user = await UserModel.findById(decodedToken.id);
                    if(user != null){
                        response.locals.user = user;
                    }
                    next();
                }
            });
        } else {
            response.locals.user = null;
            next();
        }
    }
}
