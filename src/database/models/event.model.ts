import mongoose from "mongoose";
import EventSchema from '../schemas/event.schema';

export const EventModel = mongoose.model("events", EventSchema);