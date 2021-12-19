import { Schema } from "mongoose";

export const ImageSchema = new Schema({
    id: String, 
    image: String
});

export const VideoSchema = new Schema({
    id: String, 
    video: String
});