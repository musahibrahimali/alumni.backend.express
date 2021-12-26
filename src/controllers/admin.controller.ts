import {Request, Response} from "express";
import { AdminModel } from "../models/models";
import { createToken,handleErrors } from "../utils/utils";
import config from "../config/config";
import jwt from "jsonwebtoken";

export class AdminController{
    constructor(){}
    // register a new admin
    RegisterAdmin = async (request: Request, response: Response) => {    
        const {
            emailAddress, 
            password, 
            firstName, 
            lastName, 
            phoneNumber
        } = request.body;

        try {
            const init_admin = new AdminModel({
                email: emailAddress, 
                password: password,
                displayName: firstName,
                firstName: firstName,
                lastName: lastName,
                phone: phoneNumber,
            });
            const newAdmin = await init_admin.save();
            const token = createToken(newAdmin._id);
            const admin = {
                userId: newAdmin._id,
                email: newAdmin.email,
                displayName: newAdmin.firstName,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                phone: newAdmin.phone,
                image: newAdmin.image,
            }
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * config.session.JWT_EXPIRES_IN });
            return response.status(200).json({ admin: admin });
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors: errors });
        }
    }

    // log admin in
    SignInAdmin = async (request:Request, response:Response) => {
        const {emailAddress, password} = request.body;
        try{
            //@ts-ignore
            const _admin = AdminModel.login(emailAddress, password);
            const token = createToken(_admin._id);
            const admin = {
                userId: _admin._id,
                email: _admin.email,
                displayName: _admin.displayName,
                firstName: _admin.firstName,
                lastName: _admin.lastName,
                phone: _admin.phone,
                image : _admin.image,
            }
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * config.session.JWT_EXPIRES_IN });
            return response.status(200).json({ admin : admin });
        }catch(error){
            const errors = handleErrors(error);
            return response.status(400).json({errors: errors});
        }
    }

    // get initial admin
    GetInitialAdmin = async (request:Request, response:Response) => {
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
                        const id: string = decodedToken.id;
                        const _admin = await AdminModel.findOne({_id: id});
                        const admin = {
                            userId: _admin._id,
                            email: _admin.email,
                            displayName: _admin.displayName,
                            firstName: _admin.firstName,
                            lastName: _admin.lastName,
                            phone: _admin.phone,
                            image : _admin.image,
                        }
                        return response.status(200).json({ admin: admin });
                    }
                });
            }
        }else{
            response.status(401).send({data: "There is no user logged in"});
        }
    }

    // log admin out
    LogOutAdmin = async (request:Request, response:Response) => {
        response.cookie('jwt', '', { maxAge: 1 });
        return response.redirect('/');
    }
    
}