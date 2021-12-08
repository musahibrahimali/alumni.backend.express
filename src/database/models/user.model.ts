import mongoose from 'mongoose';
import UserSchema from '../schemas/user.schema';
import bcrypt from 'bcrypt';
import {UserInterface} from "../../interface/interfaces";
import {SALT_ROUNDS} from '../../config/keys';

// fire a function before saving to database (hash password)
UserSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    if (this.isModified("password")) return next();

    const saltRounds = SALT_ROUNDS;
    const salt = await bcrypt.genSalt(saltRounds);
    // replace teh text password witht he hashed password
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.statics.login = async function (email:string, password:string):Promise<UserInterface> {
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

export const UserModel = mongoose.model("user", UserSchema);
