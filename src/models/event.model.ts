import mongoose from "mongoose";
import {ImageSchema} from "./media.schema";
const Schema = mongoose.Schema;

// event schema
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

export const EventModel = mongoose.model("event", EventSchema);