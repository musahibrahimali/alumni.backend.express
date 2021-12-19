import mongoose, { Schema } from "mongoose";
import LikeSchema from "./like.model";

const CommentSchema = new Schema({
    name: {type: String},
    comment: {type: String},
    likes: [LikeSchema],
});

export const CommentModel = mongoose.model("comment", CommentSchema);

export default CommentSchema;