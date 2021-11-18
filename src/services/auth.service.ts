import {Request, Response} from "express";
import {errorType} from "../types/errors.type";
import jwt from "jsonwebtoken";
import {JWT_SECRET,JWT_EXPIRES_IN} from '../config/keys';
import {User} from "../database/database";

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
        Object.values((error.errors).forEach((error : any) => {
            // @ts-ignore
            errors[error.properties.path] = error.properties.message;
        }));
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
            const user = await User.login(email, password);
            const token = createToken(user._id);
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({ userId: user._id });
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors });
        }
    }

    SignUp = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        try {
            const user = await User.create({ email, password });
            const token = createToken(user._id);
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({ userId: user._id });
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors });
        }
    }

    public LogOut(request: Request, response: Response){
        response.cookie('jwt', '', { maxAge: 1 });
        response.redirect('/');
    }

}