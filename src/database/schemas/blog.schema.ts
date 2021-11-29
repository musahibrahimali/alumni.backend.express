import { Schema } from "mongoose";
import {ImageSchema} from './schemas';
import CommentSchema from './comment.schema';

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
    image:[ImageSchema],
    comments:[CommentSchema],
},{
    timestamps: true,
});

export default BlogSchema;