import mongoose from 'mongoose';
import userSchema from "../schemas/user.schema";
import bcrypt from 'bcrypt';
import {UserInterface} from "../../interface/user.interface";

// hash password

// fire a function before saving to database (hash password)
userSchema.pre('save', async function (next) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email:string, password:string):Promise<UserInterface> {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('user not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('incorrect password');
    }
    return user;
}

export const User = mongoose.model("user", userSchema);
