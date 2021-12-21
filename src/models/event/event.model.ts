import mongoose from "mongoose";
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
    image: [String],
},{
    timestamps: true,
});

export const EventModel = mongoose.model("Event", EventSchema);