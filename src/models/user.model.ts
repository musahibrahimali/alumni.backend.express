import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {UserInterface} from "../interface/interfaces";
import config from '../config/config';

import validator from "validator";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid password"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    displayName: {
        type: String,
        required: false,
    },
    firstName:{
        type: String,
        required: [true, "This field is required"],
    },
    lastName:{
        type: String,
        required: [true, "This field is required"],
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [8, "Password must be less than 8 characters"]
    },
    image: {
        type: String,
        required: false,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
},{
    timestamps: true
});

//  post user schema
export const PostUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    displayName: {
        type: String,
        required: false,
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    image: {
        type: String,
        required: false,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
});

// fire a function before saving to database (hash password)
UserSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, config.session.SALT_ROUNDS);
    user.password = hash;
    next();
});

UserSchema.statics.login = async function (email:string, password:string):Promise<UserInterface> {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return user;
}

export const UserModel = mongoose.model("user", UserSchema);
