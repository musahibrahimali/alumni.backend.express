import mongoose from 'mongoose';
import UserSchema from '../schemas/user.schema';
import bcrypt from 'bcrypt';
import {UserInterface} from "../../interface/interfaces";
import {SALT_ROUNDS} from '../../config/keys';

// fire a function before saving to database (hash password)
UserSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
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
