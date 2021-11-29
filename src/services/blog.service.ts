import { Request, Response } from "express";
import { BlogModel } from '../database/models/models';


export class BlogService{
    constructor(){}

    getAllBlogs = async (request:Request, response:Response) => {
        try{
            const blogs = await BlogModel.find();
            return response.status(200).json({ blogs: blogs });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }
    
    getBlogById = async (request: Request, response:Response) => {
        try{
            const blog = await BlogModel.findById(request.params.id);
            return response.status(200).json({ blog: blog });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    getBlogByTitle = async (request:Request, response:Response) => {
        const {title} = request.body;
        const event = await BlogModel.findOne({ title : title });
        return response.status(200).json({ event: event });
    }

    createBlog = async (request: Request, response:Response) => {
        const { title, category, snippet, details, date, image, comments } = request.body;
        try{
            const blog = new BlogModel({
                title : title,
                category : category,
                snippet : snippet,
                details : details,
                date : date,
                image : image,
                comments : comments,
            });
            const newBlog = await blog.save();
            return response.status(200).json({ blogId: newBlog._id });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    updateBlog = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            const event = BlogModel.findByIdAndUpdate({_id : id},{});
            return response.status(400).json({event: event });
        }catch(error){
            return response.status(400).json({ error: error });
        }
    }

    deleteBlog = async (request:Request, response:Response) => {
        const {id} = request.body;
        try{
            await BlogModel.deleteOne({_id : id});
            return response.status(200).json({ message: "Deleted Successfully" });

        }catch(error){
            return response.status(400).json({ error: error });
        }
    }
}