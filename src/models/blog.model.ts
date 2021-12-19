import mongoose from "mongoose";
import { ImageSchema, VideoSchema } from './media.schema';
import CommentSchema from './comment.model';

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
    image:[ImageSchema],
    video: [VideoSchema],
    Comments:[CommentSchema],
},{
    timestamps: true,
});

export const BlogModel = mongoose.model("blog", BlogSchema);