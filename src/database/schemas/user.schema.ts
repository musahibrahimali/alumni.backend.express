import mongoose from 'mongoose';
import validator from "validator";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid password"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
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
    }
},{
    timestamps: true
});

export default UserSchema;