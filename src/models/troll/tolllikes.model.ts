import mongoose, {Schema} from 'mongoose';

const TrollLikesSchema = new Schema({
    troll: {
        type: Schema.Types.ObjectId,
        ref: 'Troll',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});

export const TrollLikesModel = mongoose.model('TrollLike', TrollLikesSchema);