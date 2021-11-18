import {Request, Response} from 'express';
import {AppService} from '../services/services';

const appService = new AppService();

export class AppController{
    public home_page(request: Request, response: Response){
        return appService.Index(request, response);
    }
}