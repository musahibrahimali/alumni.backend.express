import { Request, Response } from "express";
import { EventModel } from "../database/database";

export class EventsService{
    constructor(){}

    getAllEvents = async (request:Request, response:Response) => {
        try{
            const events = await EventModel.find();
            return response.status(200).json({ events: events });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    getEventById = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            const event = await EventModel.findById({_id : id });
            return response.status(200).json({ event: event });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    getEventByTitle = async (request:Request, response:Response) => {
        const {title} = request.body;
        const event = await EventModel.findOne({ title : title });
        return response.status(200).json({ event: event });
    }

    createEvent = async (request:Request, response:Response) => {
        const { title, details, image } = request.body;
        const snippet = details.substring(0, 100);
        try{
            const event = new EventModel({
                title : title,
                snippet : snippet,
                details : details,
                date : new Date(),
                image : image,
            });
            const newEvent = await event.save();
            return response.status(200).json({ eventId : newEvent._id });
        }catch(error){
            return response.status(400).json({ error });
        }
    }

    updateEvent = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            const event = EventModel.findByIdAndUpdate({_id : id},{});
            return response.status(200).json({event: event });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    deleteEvent = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            await EventModel.deleteOne({_id : id});
            return response.status(200).json({ message: "Deleted Successfully" });

        }catch(error){
            return response.status(400).json({ error: error });
        }
    }
}