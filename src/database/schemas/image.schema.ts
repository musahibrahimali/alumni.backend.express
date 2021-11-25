import { Schema } from "mongoose";

const ImageSchema = new Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

export default ImageSchema;