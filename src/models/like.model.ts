import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    name: {
        type: String,
    }
});

export default LikeSchema;

