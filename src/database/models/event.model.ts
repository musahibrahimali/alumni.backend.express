import mongoose from "mongoose";
import {EventSchema} from '../schemas/schemas';

export const EventModel = mongoose.model("event", EventSchema);