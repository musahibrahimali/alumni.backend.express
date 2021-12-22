import mongoose, {Schema} from 'mongoose';




export const TrollLikesSchema = new Schema({
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
