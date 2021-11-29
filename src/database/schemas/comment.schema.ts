import { Schema } from "mongoose";

const CommentSchema = new Schema({
    name: String,
    comment: String,
    likes: Number,
});

export default CommentSchema;