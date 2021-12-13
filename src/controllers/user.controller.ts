import {Request, Response} from "express";
import config from "../config/config";
import { UserModel,SocialUserModel } from "../models/models";
import { createToken,handleErrors } from "../utils/utils";
import jwt from "jsonwebtoken";

export class UserController{
    constructor(){}
    // sign in
    SignIn = async (request: Request, response: Response) => {
        const {email, password} = request.body;
        try {
            // @ts-ignore
            const user = await UserModel.login(email, password);
            const token = createToken(user._id);
            const data = {
                userId: user._id,
                email: user.email,
                displayName: user.displayName,
                firstName: user.firstName,
                lastName: user.lastName,
                image : user.image,
            }
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * config.session.JWT_EXPIRES_IN });
            return response.status(200).json({ data: data });
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors : errors });
        }
    }

    SignUp = async (request: Request, response: Response) => {
        const { email, firstName, lastName, password } = request.body;
        try {
            const user = new UserModel({ 
                email: email,
                password: password,
                displayName: firstName,
                firstName: firstName,
                lastName: lastName
            });
            const newUser = await user.save();
            const token = createToken(user._id);
            const data = {
                userId: newUser._id,
                email: newUser.email,
                displayName: newUser.displayName,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                image : newUser.image,
            }
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * config.session.JWT_EXPIRES_IN });
            return response.status(200).json({data: data});
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors : errors });
        }
    }

    // facebook login
    FacebookLogin = async (request: Request, response: Response) => {
       // @ts-ignore
        const {_id} = request.user;
        const token = createToken(_id);
        response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * config.session.JWT_EXPIRES_IN });
        return response.redirect(config.origin.CLIENT_URL);
    }

    // google login
    GoogleLogin = async (request: Request, response: Response) => {
        // @ts-ignore
        const {_id} = request.user;
        const token = createToken(_id);
        response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * config.session.JWT_EXPIRES_IN });
        return response.redirect(config.origin.CLIENT_URL);
    }

    SocialLogin = async (request: Request, response: Response) => {
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
            // verify token and return user details
            if(token){
                jwt.verify(token, config.session.cookieKey, async (error:any, decodedToken:any) => {
                    if (error){
                        return response.status(200).send({data: "There was an error fetching user"});
                    }else{
                        const _id: string = decodedToken.userId;
                        const _user = await UserModel.findById(_id);
                        const _socialUser = await SocialUserModel.findOne({userId: _id});
                        if(_user){
                            const data = {
                                userId: _user._id,
                                email: _user.email,
                                displayName: _user.displayName,
                                firstName: _user.firstName,
                                lastName: _user.lastName,
                                image : _user.image,
                            }
                            return response.status(200).json({ data: data });
                        }else{
                            const data = {
                                userId: _socialUser._id,
                                email: _socialUser.email,
                                displayName: _socialUser.displayName,
                                firstName: _socialUser.firstName,
                                lastName: _socialUser.lastName,
                                image : _socialUser.image,
                            }
                            return response.status(200).json({ data: data });
                        }
                    }
                });
            }
        }else{
            response.status(401).send({data: "There is no user logged in"});
        }
    }

    // log out
    LogOut = (request: Request, response: Response) => {
        response.cookie('jwt', '', { maxAge: 1 });
        response.redirect('/');
    }
}