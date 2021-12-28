import { Request, Response } from 'express';
import { Router } from 'express';
import { NewsController } from '../controllers/controllers';
import { newsUploadMiddleware } from '../middleware/middlewares';

const router = Router();
const newsController = new NewsController();

// create news item
router.post('/news/create', newsUploadMiddleware, (request: Request, response: Response) => {
    return newsController.createNews(request, response);
});

// get all news 
router.get('/news', (request: Request, response: Response) => {
    return newsController.getAllNews(request, response);
});

// get news by id
router.get('/news/:id', (request: Request, response: Response) => {
    return newsController.getNewsById(request, response);
});

// get news by title
router.get('/news/:title', (request: Request, response: Response) => {
    return newsController.getNewsByTitle(request, response);
});

// delete news
router.delete('/news/:id', (request: Request, response: Response) => {
    return newsController.deleteNews(request, response);
});

export default router;