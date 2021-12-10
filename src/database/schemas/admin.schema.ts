import mongoose from 'mongoose';
import validator from 'validator';

const AdminSchema = new mongoose.Schema({
    socialId: {
        type: String,
        default: '',
    },
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
    image: {
        type: String,
        required: false,
        default: 'https://res.cloudinary.com/dzqb0zvxu/image/upload/v1589788981/default_avatar_jxqzqz.png'
    },
}, {
    timestamps: true
});

export default AdminSchema;