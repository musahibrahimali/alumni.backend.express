import { Request, Response, Router } from "express";
import { BlogController } from '../controllers/controllers';
import { blogUploadMiddleware } from '../middleware/blog.middleware';

const router = Router();

const blogController = new BlogController();

// create blog
router.post('/blog/create', blogUploadMiddleware, (request:Request, response:Response) => {
    return blogController.createBlog(request, response);
});

// get all blog items
router.get('/blog', (request: Request, response:Response) => {
    return blogController.getAllBlogs(request, response);
});

// get blog item by id
router.get('/blog/:id', (request: Request, response:Response) => {
    return blogController.getBlogById(request, response);
});

// get blog item by title
router.get('/blog/:title', (request: Request, response:Response) => {
    return blogController.getBlogByTitle(request, response);
});

// update blog item
router.put('/blog/:id', (request: Request, response:Response) => {
    return blogController.updateBlog(request, response);
});

// delete blog item
router.delete('/blog/:id', (request: Request, response:Response) => {
    return blogController.deleteBlog(request, response);
});


export default router;