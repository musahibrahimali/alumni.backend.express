import mongoose from 'mongoose';
import ImageSchema from './image.schema';
import Schema = mongoose.Schema;


// trolls schema
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

export const TrollModel = mongoose.model("troll", TrollSchema);
