import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/keys';
import {UserModel} from "../database/models/models";

export const requireAuth = (request:Request, response:Response, next:NextFunction) => {
    const token = request.cookies.jwt;

    // check if token is valid
    if (token) {
        jwt.verify(token, JWT_SECRET, (error:any, decodedToken: number|any) => {
            if (error) {
                // if the token is invalid, redirect to login
                response.redirect('/login');
            } else {
                // @ts-ignore
                request.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        // if no token, redirect to login
        response.redirect('/login');
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
                response.locals.user = await UserModel.findById(decodedToken.id);
                next();
            }
        });
    } else {
        response.locals.user = null;
        next();
    }
}