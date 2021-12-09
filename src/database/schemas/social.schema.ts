import mongoose from 'mongoose';

const SocialUserSchema = new mongoose.Schema({
    socialId: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: [true, "This field is required"],
    },
    lastName:{
        type: String,
        required: [true, "This field is required"],
    },
    image: {
        type: String,
        required: false,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
},{
    timestamps: true
});

export default SocialUserSchema;