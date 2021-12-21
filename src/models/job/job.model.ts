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
    date: {
        type: String,
        required: [true, "This field is required"],
    },
    logo:[String],
},{
    timestamps: true,
});

export const JobModel = mongoose.model("job", JobSchema);
