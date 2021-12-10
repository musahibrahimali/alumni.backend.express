import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET,JWT_EXPIRES_IN} from '../config/keys';
import {SocialUserModel, UserModel} from "../database/database";
import { CLIENT_URL, createToken, handleErrors } from "../utils/utils";

export class UserService{
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
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
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
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
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
        response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
        return response.redirect(CLIENT_URL);
    }

    // google login
    GoogleLogin = async (request: Request, response: Response) => {
        // @ts-ignore
        const {_id} = request.user;
        const token = createToken(_id);
        response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
        return response.redirect(CLIENT_URL);
    }

    SocialLogin = async (request: Request, response: Response) => {
        let token: string = "";
        const rawcookies = request.headers.cookie?.split("; ");
        // const parsedCookies: any = {};
        rawcookies?.forEach((rawCookie) => {
            const parsedCookie = rawCookie?.split("=");
            const key = parsedCookie[0];
            const value = parsedCookie[1];
            if(key === 'jwt'){
                token = value.toString();
            }
            // parsedCookies[key] = value;
        });
        if(token != ""){
            jwt.verify(token, JWT_SECRET, async (error:any, decodedToken:any) => {
                if(error){
                    return {"message": "no user authenticated yet"}
                }else{
                    const user = await SocialUserModel.findById(decodedToken.id);
                    if(user){
                        const data = {
                            userId: user._id,
                            email: user.email,
                            displayName: user.displayName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            image : user.image,
                        }
                        return response.status(200).json({ data: data });
                    }
                }
            });
        }else{
            const data = {
                message: "There is no user logged in"
            }
            return response.status(400).json({ data: data });
        }
    }    

    // log out
    LogOut = (request: Request, response: Response) => {
        response.cookie('jwt', '', { maxAge: 1 });
        response.redirect('/');
    }

}