import {Request, Response} from 'express';

export class AppController{
    // home page end point
    Index = async (request: Request, response: Response) => {
        return response.status(200).send({page: "home"});
    }
}