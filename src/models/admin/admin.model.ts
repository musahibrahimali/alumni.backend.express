import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { AdminInterface } from '../../interface/interfaces';
import validator from 'validator';
import config from '../../config/config';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid password"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: [true, "This field is required"],
    },
    lastName: {
        type: String,
        required: [true, "This field is required"],
    },
    phone: {
        type: String,
        required: [validator.isMobilePhone, "Please enter a valid phone number"],
    },
    previousImages: [String],
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dzqb0zvxu/image/upload/v1589788981/default_avatar_jxqzqz.png'
    },
}, {
    timestamps: true
});

AdminSchema.pre('save', async function (next) {
    const admin = this;
    if (!admin.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hashSync(admin.password, config.session.SALT_ROUNDS);
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