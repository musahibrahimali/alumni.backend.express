import {Request, Response} from "express";
import {errorType} from "../types/errors.type";
import jwt from "jsonwebtoken";
import {JWT_SECRET,JWT_EXPIRES_IN} from '../config/keys';
import {SocialUserModel, UserModel} from "../database/database";

// client url
const CLIENT_URL = "http://localhost:3000/";

const handleErrors = (error: any) => {
    // error message to send to user
    let errors: errorType = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    }

    // duplicate error code
    if (error.code === 11000) {
        errors.email = "The email is already in use by another account";
    }

    // validation errors
    if (error.message.includes('user validation failed')) {
        errors.email = "Email in use by another user";
    }

    if (error.message === 'user not found') {
        errors.email = "No Account associated with this email";
    }

    if (error.message === 'incorrect password') {
        errors.password = "Incorrect Password";
    }

    return errors;
}

const createToken = (id: number | string) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

export class AuthService{
    SignIn = async (request: Request, response: Response) => {
        const {email, password} = request.body;
        try {
            // @ts-ignore
            const user = await UserModel.login(email, password);
            const token = createToken(user._id);
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            const data = {
                userId: user._id,
                email: user.email,
                displayName: user.displayName,
                firstName: user.firstName,
                lastName: user.lastName,
                image : user.image,
            }
            return response.status(200).json({ data: data });
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors : errors });
        }
    }

    SignUp = async (request: Request, response: Response) => {
        const { email, firstName, lastName,password } = request.body;
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
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            const data = {
                userId: newUser._id,
                email: newUser.email,
                displayName: newUser.displayName,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                image : newUser.image,
            }
            return response.status(200).json({data: data});
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors : errors });
        }
    }

    // facebook login
    FacebookLogin = async (request: Request, response: Response) => {
        return response.redirect('/social/callback');
    }

    // google login
    GoogleLogin = async (request: Request, response: Response) => {
        return response.redirect('/social/callback');
    }

    // social login callback
    SocialCallback = async (request: Request, response: Response) => {
        // @ts-ignore
        const {_id} = request.user;
        const user = await SocialUserModel.findById(_id);
        const data = {
            userId: user._id,
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            image : user.image,
            socialId: user.socialId,
        }
        const token = createToken(_id);
        response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
        return response.status(200).json({data: data}).redirect(CLIENT_URL);
    }

    // log out
    LogOut = (request: Request, response: Response) => {
        response.cookie('jwt', '', { maxAge: 1 });
        response.redirect('/');
    }

}