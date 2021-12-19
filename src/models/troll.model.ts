import mongoose from 'mongoose';
import CommentSchema from './comment.model';
import ImageSchema from './image.schema';
import LikeSchema from './like.model';
import Schema = mongoose.Schema;

// trolls schema
const TrollSchema = new Schema({
    details:{
        type: String,
    },
    snippet:{
        type: String,
    },
    user:{
        type: String,
        required: [true, "This field is required"]
    },
    media:[ImageSchema],
    likes: [LikeSchema],
    comments: [CommentSchema],
},{
    timestamps: true,
});

export const TrollModel = mongoose.model("troll", TrollSchema);
