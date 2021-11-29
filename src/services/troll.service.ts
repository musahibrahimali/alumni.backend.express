import { Request, Response } from "express";
import { TrollModel } from "../database/database";

export class TrollService{
    constructor(){}

    getAllTrolls = async (request: Request, response: Response) => {
        try{
            const trolls = await TrollModel.find();
            return response.status(200).json({ trolls : trolls });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    getTrollById = async (request: Request, response: Response) => {
        const id = request.params.id;
        try{
            const troll = await TrollModel.findById({_id: id});
            return response.status(200).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    getTrollByUser = async (request: Request, response: Response) => {
        const user = request.params.user;
        try{
            const troll = await TrollModel.findOne({user: user});
            return response.status(200).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    createTroll = async (request: Request, response: Response) => {
        const {user, details} = request.body;
        const snippet = details.substring(0, 100);
        try{
            const newTroll = new TrollModel({
                user: user,
                details: details,
                snippet: snippet,
                date: new Date(),
            });
            const troll = await newTroll.save();
            return response.status(200).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    updateTroll = async (request: Request, response: Response) => {
        const {id} = request.body;
        try{
            const troll = await TrollModel.findByIdAndUpdate({_id : id},{});
            return response.status(400).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    deleteTroll = async (request: Request, response: Response) => {
        const {id} = request.body;
        try{
            await TrollModel.deleteOne({_id : id});
            return response.status(200).json({ message : "Deleted Successfully" });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }
}