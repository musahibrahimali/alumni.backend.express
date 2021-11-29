import { Request, Response, Router } from "express";
import { EventsController } from "../controllers/events.controller";

const router = Router();

const eventsController = new EventsController();

// create event
router.post('/events', (request:Request, response:Response) => {
    return eventsController.createEvent(request, response);
});

// get all events
router.get('/events', (request:Request, response:Response) => {
    return eventsController.getAllEvents(request, response);
});

// get event by id
router.get('/events:id', (request:Request, response:Response) => {
    return eventsController.getEventById(request, response);
});

// get event by title
router.get('/events:title', (request:Request, response:Response) => {
    return eventsController.getEventByTitle(request, response);
});

// update event
router.put('/events:id', (request:Request, response:Response) => {
    return eventsController.updateEvent(request, response);
});

// delete event
router.delete('/events:id', (request:Request, response:Response) => {
    return eventsController.deleteEvent(request, response);
});

export default router;
