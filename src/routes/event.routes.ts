import { Request, Response, Router } from "express";
import { EventsController } from "../controllers/events.controller";

const router = Router();
const eventsController = new EventsController();

router.post('/events', (request:Request, response:Response) => {
    return eventsController.createEvent(request, response);
});

router.post('/events:id', (request:Request, response:Response) => {
    return eventsController.updateEvent(request, response);
});

router.post('/events:id', (request:Request, response:Response) => {
    return eventsController.deleteEvent(request, response);
});

router.get('/events', (request:Request, response:Response) => {
    return eventsController.getAllEvents(request, response);
});

router.get('/events:id', (request:Request, response:Response) => {
    return eventsController.getEventById(request, response);
});

router.get('/events:title', (request:Request, response:Response) => {
    return eventsController.getEventByTitle(request, response);
});

export default router;
