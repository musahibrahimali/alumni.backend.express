import { Schema } from "mongoose";
import {ImageSchema} from './schemas';

const TrollSchema = new Schema({
    details:{
        type: String,
        required: [true, "This field is required"],
    },

    snippet:{
        type: String,
    },

    image:[ImageSchema],

    date: {
        type: String,
    },

},{
    timestamps: true,
});

export default TrollSchema;