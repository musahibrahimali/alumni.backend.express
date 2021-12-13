import mongoose from "mongoose";
import ImageSchema from "./image.schema";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, "This field is required"],
    },

    category: {
        type: String,
        required: [true, "This field is required"],
    },

    snippet:{
        type: String,
    },

    details:{
        type: String,
        required: [true, "This field is required"],
    },

    date: {
        type: String,
    },

    image:[ImageSchema],

    Comments:[{
        name: {
            type: String,
        },
        comment: {
            type: String,
        },
        date: {
            type: String,
        },
    }],

},{
    timestamps: true,
});

export const BlogModel = mongoose.model("blog", BlogSchema);