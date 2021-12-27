import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: [true, "This field is required"],
    },
    url:{
        type: String,
        required: [true, "This field is required"],
    },
    snippet:{
        type: String,
        required: [true, "This field is required"],
    },
    details:{
        type: String,
        required: [true, "This field is required"],
    },
    location:{
        type: String,
        required: [true, "This field is required"],
    },
    expireDate: {
        type: String,
        required: [true, "This field is required"],
    },
    logo:{
        type: String,
    },
    images: [String],
},{
    timestamps: true,
});

export const JobModel = mongoose.model("Job", JobSchema);
