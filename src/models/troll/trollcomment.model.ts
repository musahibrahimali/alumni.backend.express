import mongoose, {Schema} from 'mongoose';

const TrollCommentSchema = new Schema({
    troll: {
        type: Schema.Types.ObjectId,
        ref: 'Troll',
        required: true
    },
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

export const TrollCommentModel = mongoose.model('TrollComment', TrollCommentSchema);
