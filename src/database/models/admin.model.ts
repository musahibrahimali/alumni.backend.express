import mongoose from 'mongoose';
import AdminSchema from '../schemas/admin.schema';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../config/keys';
import { AdminInterface } from '../../interface/interfaces';

AdminSchema.pre('save', async function (next) {
    const admin = this;
    if (!admin.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hashSync(admin.password, SALT_ROUNDS);
    admin.password = hash;
});

AdminSchema.statics.login = async function (email, password):Promise<AdminInterface> {
    const admin = await this.findOne({ email });
    if (!admin) {
        throw new Error('Invalid email or password');
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
        throw new Error('Invalid email or password');
    }
    return admin;
};

export const AdminModel = mongoose.model('admin', AdminSchema);