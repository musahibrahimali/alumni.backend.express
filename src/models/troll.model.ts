import mongoose from 'mongoose';
import CommentSchema from './comment.model';
// import { ImageSchema, VideoSchema } from './media.schema';
import { PostUserSchema } from './user.model';
import LikeSchema from './like.model';
import Schema = mongoose.Schema;

// trolls schema
const TrollSchema = new Schema({
    post:{type: String},
    user: PostUserSchema,
    images:[{id: String, image: String}],
    videos:[{id: String, video: String}],
    likes: [LikeSchema],
    comments: [CommentSchema],
},{
    timestamps: true,
});

export const TrollModel = mongoose.model("troll", TrollSchema);
