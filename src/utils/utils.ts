import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/keys";
import { errorType } from "../types/errors.type";

// client url
export const CLIENT_URL = "http://localhost:3000/";

export const createToken = (id: number | string) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

export const handleErrors = (error: any) => {
    // error message to send to user
    let errors: errorType = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
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

    if (error.message === 'invalid phone number') {
        errors.phone = "Invalid Phone Number";
    }

    return errors;
}