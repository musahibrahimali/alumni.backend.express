import { Request, Response } from "express";
import { TrollModel } from "../models/models";
import { UserModel } from '../models/user.model';
import { SocialUserModel } from '../models/social.model';

export class TrollController{
    constructor(){}
    // get all trolls
    getAllTrolls = async (request: Request, response: Response) => {
        try{
            const trolls = await TrollModel.find();
            return response.status(200).json({ trolls : trolls });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // get troll by id
    getTrollById = async (request: Request, response: Response) => {
        const id = request.params.id;
        try{
            const troll = await TrollModel.findById({_id: id});
            return response.status(200).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }
    
    // get an individual troll by user
    getTrollByUser = async (request: Request, response: Response) => {
        const user = request.params.user;
        try{
            const troll = await TrollModel.findOne({user: user});
            return response.status(200).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // create troll
    createTroll = async (request: Request, response: Response) => {
        const {userId, post, images, videos} = request.body;
        let user = null;
        const user_1 = await UserModel.findOne({_id: userId});
        const user_2 = await SocialUserModel.findOne({_id: userId});
        try{
            if(post.trim() === "" && images.length === 0 && videos.length === 0){
                return response.status(400).json({ errors : "Post cannot be empty" });
            }else{
                if(user_1 != null){
                    const data = {
                        userId: user_1._id,
                        email: user_1.email,
                        displayName: user_1.displayName,
                        firstName: user_1.firstName,
                        lastName: user_1.lastName,
                        image : user_1.image,
                    }
                    user = data;
                }else{
                    const data = {
                        userId: user_2._id,
                        email: user_2.email,
                        displayName: user_2.displayName,
                        firstName: user_2.firstName,
                        lastName: user_2.lastName,
                        image : user_2.image,
                    }
                    user = data;
                }

                // create troll
                const newTroll = new TrollModel({
                    user: user,
                    post: post,
                    images: [],
                    videos: [],
                    comments: [],
                    likes: [],
                });
                const troll = await newTroll.save();
                // get the saved troll id
                const trollId = troll._id;
                // loop through the images and save them to the images field
                for(let i = 0; i < images.length; i++){
                    const {id, value} = images[i];
                    // update the images field
                    await TrollModel.updateOne(
                        {_id: trollId}, 
                        {$push: {images: {id: id, image: value}}}
                    );
                }
                return response.status(200).json({ troll : troll });
            }
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // update troll post
    updateTroll = async (request: Request, response: Response) => {
        const {id} = request.body;
        try{
            const troll = await TrollModel.findByIdAndUpdate({_id : id},{});
            return response.status(400).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // add comment to troll
    addComment = async (request: Request, response: Response) => {
        const {id, comment} = request.body;
        try{
            const troll = await TrollModel.findByIdAndUpdate({_id : id},{
                $push: {
                    comments: comment
                }
            });
            return response.status(200).json({ troll : troll });
        }catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // update troll post likes
    updateLikes = async (request: Request, response: Response) => {
        const {id, user} = request.body;
        try{
            const troll = await TrollModel.findByIdAndUpdate({_id : id},{
                $push: {
                    likes: user
                }
            });
            return response.status(200).json({ troll : troll });
        }
        catch(error){
            return response.status(400).json({ errors : error });
        }
    }

    // delete troll post
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