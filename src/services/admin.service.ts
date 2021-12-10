import {Request, Response} from "express";
import { JWT_EXPIRES_IN } from "../config/keys";
import { AdminModel } from "../database/models/admin.model";
import { createToken, handleErrors } from "../utils/utils";

export class AdminService {
    constructor(){}

    // register a new admin
    RegisterAdmin = async (request: Request, response: Response) => {    
        const {email, password, firstName, lastName, phone} = request.body;
        try {
            const admin = new AdminModel({
                email: email, 
                password: password,
                displayName: firstName,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
            });
            const newAdmin = await admin.save();
            const token = createToken(newAdmin._id);
            const data = {
                userId: newAdmin._id,
                email: newAdmin.email,
                displayName: newAdmin.firstName,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                phone: newAdmin.phone,
                image: newAdmin.image,
            }
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({ data: data });
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors: errors });
        }
    }

    // log admin in
    SignInAdmin = async (request:Request, response:Response) => {
        const {email, password} = request.body;
        try{
            //@ts-ignore
            const admin = AdminModel.login(email, password);
            const token = createToken(admin._id);
            const data = {
                userId: admin._id,
                email: admin.email,
                displayName: admin.displayName,
                firstName: admin.firstName,
                lastName: admin.lastName,
                phone: admin.phone,
                image : admin.image,
            }
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({ data : data });
        }catch(error){
            const errors = handleErrors(error);
            return response.status(400).json({errors: errors});
        }
    }

    GetInitialAdmin = async (request:Request, response:Response) => {
        const {id} = request.params;
        const admin = await AdminModel.findOne({_id:id});
        if(admin){
            const data = {
                userId: admin._id,
                email: admin.email,
                displayName: admin.displayName,
                firstName: admin.firstName,
                lastName: admin.lastName,
                phone: admin.phone,
                image : admin.image,
            }
            return response.status(200).json({ data : data });
        }else{
            return response.status(400).json({ message: "Admin not found"});
        }
    }

    LogOutAdmin = async (request:Request, response:Response) => {
        response.cookie('jwt', '', { maxAge: 1 });
        return response.redirect('/');
    }

}