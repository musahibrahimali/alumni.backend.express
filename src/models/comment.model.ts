import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    name: String,
    comment: String,
    likes: Number,
});

export const CommentModel = mongoose.model("comment", CommentSchema);