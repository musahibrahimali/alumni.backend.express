import mongoose, {Schema} from 'mongoose';

const NewsSchema = new Schema({
    title: {
        type: String,
        required: [true, "This field is required"]
    },
    snippet: {
        type:String,
        required: [true, "This field is required"],
    },
    details: {
        type:String,
        required: [true, "This field is required"],
    },
    images: [String],
    videos: [String]
});

export const NewsModel = mongoose.model('New', NewsSchema);