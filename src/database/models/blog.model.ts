import mongoose from "mongoose";
import {BlogSchema} from '../schemas/schemas';

export const BlogModel = mongoose.model("blog", BlogSchema);