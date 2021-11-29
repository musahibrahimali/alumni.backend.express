import { Request, Response } from "express";
import { EventsService } from '../services/services';

const eventsService = new EventsService();

export class EventsController{
    constructor(){}

    getAllEvents = (request:Request, response:Response) => {
        return eventsService.getAllEvents(request, response);
    }

    getEventById = (request:Request, response:Response) => {
        return eventsService.getEventById(request, response);
    }

    getEventByTitle = (request:Request, response:Response) => {
        return eventsService.getEventByTitle(request, response);
    }

    createEvent = (request:Request, response:Response) => {
        return eventsService.createEvent(request, response);
    }

    updateEvent = (request:Request, response:Response) => {
        return eventsService.updateEvent(request, response);
    }

    deleteEvent = (request:Request, response:Response) => {
        return eventsService.deleteEvent(request, response);
    }

}