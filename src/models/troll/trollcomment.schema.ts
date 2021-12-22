import mongoose, {Schema} from 'mongoose';

export const TrollCommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});
