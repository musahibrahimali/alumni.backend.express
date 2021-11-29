import { Schema } from "mongoose";
import ImageSchema from './image.schema';

const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, "This field is required"],
    },
    details:{
        type: String,
        required: [true, "This field is required"],
    },
    snippet:{
        type: String,
    },
    date: {
        type: String,
    },
    image: [ImageSchema],
},{
    timestamps: true,
});

export default EventSchema;