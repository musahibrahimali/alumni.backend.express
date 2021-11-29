import { Request, Response } from "express";
import { TrollService } from '../services/services';

const trollService = new TrollService();

export class TrollController{
    constructor(){}

    getAllTrolls = (request: Request, response: Response) => {
        return trollService.getAllTrolls(request, response);
    };

    getTrollById = (request: Request, response: Response) => {
        return trollService.getTrollById(request, response);
    }

    getTrollByUser = (request: Request, response: Response) => {
        return trollService.getTrollByUser(request, response);
    }

    createTroll = (request: Request, response: Response) => {
        return trollService.createTroll(request, response);
    }

    updateTroll = (request: Request, response: Response) => {
        return trollService.updateTroll(request, response);
    }

    deleteTroll = (request: Request, response: Response) => {
        return trollService.deleteTroll(request, response);
    }
    
}