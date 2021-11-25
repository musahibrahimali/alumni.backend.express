import { Request, Response } from "express";
import { EventsService } from '../services/services';

const eventsService = new EventsService();

export class EventsController{
    constructor(){}

    public getAllEvents(request:Request, response:Response){
        return eventsService.getAllEvents(request, response);
    }

    public getEventById(request:Request, response:Response){
        return eventsService.getEventById(request, response);
    }

    public getEventByTitle(request:Request, response:Response){
        return eventsService.getEventByTitle(request, response);
    }

    public createEvent(request:Request, response:Response){
        return eventsService.createEvent(request, response);
    }

    public updateEvent(request:Request, response:Response){
        return eventsService.updateEvent(request, response);
    }

    public deleteEvent(request:Request, response:Response){
        return eventsService.deleteEvent(request, response);
    }

}