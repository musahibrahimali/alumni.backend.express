import { BlogService } from "../services/services";
import { Request, Response } from "express";

const blogService = new BlogService();

export class BlogController{
    constructor(){}
    
    getAllBlogs = (request:Request, response:Response) => {
        return blogService.getAllBlogs(request, response);
    }

    getBlogById = (request:Request, response:Response) => {
        return blogService.getBlogById(request, response);
    }

    getBlogByTitle = (request:Request, response:Response) => {
        return blogService.getBlogByTitle(request, response);
    }

    createBlog = (request:Request, response:Response) => {
        return blogService.createBlog(request, response);
    }

    updateBlog = (request:Request, response:Response) => {
        return blogService.updateBlog(request, response);
    }

    deleteBlog = (request:Request, response:Response) => {
        return blogService.deleteBlog(request, response);
    }

}