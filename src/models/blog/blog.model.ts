import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, "This field is required"],
    },
    category: {
        type: String,
        required: [true, "This field is required"],
    },
    snippet:{
        type: String,
    },
    details:{
        type: String,
        required: [true, "This field is required"],
    },
    date: {
        type: String,
    },
    images:[String],
    videos: [String],
    Comments:[{}],
},{
    timestamps: true,
});

export const BlogModel = mongoose.model("Blog", BlogSchema);