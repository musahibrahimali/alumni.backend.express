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
    date: {
        type: String,
        required: [true, "This field is required"],
    },
    image:[ImageSchema],
},{
    timestamps: true,
});

export default EventSchema;