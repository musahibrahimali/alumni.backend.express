import mongoose from 'mongoose';
import Schema = mongoose.Schema;

// trolls schema
const TrollSchema = new Schema({
    post:{type: String},
    user: {type: String},
    images:[String], // {id: String, image: String}
    videos:[String], // {id: String, video: String}
    likes: [String],
    comments: [String],
},{
    timestamps: true,
});

export const TrollModel = mongoose.model("Troll", TrollSchema);
