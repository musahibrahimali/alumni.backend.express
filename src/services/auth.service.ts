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
        const {email} = request.body;
        const pass = request.body.password;
        try {
            // @ts-ignore
            const user = await User.login(email, pass);
            const token = createToken(user._id);
            const {password, ...userWithoutPassword} = user;
            console.log(userWithoutPassword);
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({ userId: user._id, user: userWithoutPassword });
        } catch (error) {
            const errors = handleErrors(error);
            return response.status(400).json({ errors });
        }
    }

    SignUp = async (request: Request, response: Response) => {
        const { email, firstName, lastName,password } = request.body;
        try {
            const user = await User.create({ 
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            });
            const token = createToken(user._id);
            const userEmail = user.email;
            const userFirstName = user.firstName;
            const userLastName = user.lastName;
            const userId = user._id;
            const createdAt = user.createdAt;
            const updatedAt = user.updatedAt;
            response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * JWT_EXPIRES_IN });
            return response.status(200).json({
                userId: userId,
                email: userEmail,
                firstName: userFirstName,
                lastName: userLastName,
                createdAt: createdAt,
                updatedAt: updatedAt
            });
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