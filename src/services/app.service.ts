import {Request, Response} from "express";

export class AppService{
    constructor() {}

    public Index(request: Request, response: Response) {
        return response.send({name: 'Home Page'});
    }
}
