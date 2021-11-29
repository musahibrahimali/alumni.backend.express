import mongoose from 'mongoose';
import {TrollSchema} from '../schemas/schemas';

export const TrollModel = mongoose.model("troll", TrollSchema);
