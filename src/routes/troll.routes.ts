import { Request, response, Response, Router } from "express";
import { TrollController } from '../controllers/troll.controller';
import { checkUser, requireAuth } from "../middleware/auth.middleware";
import { uploadMiddleware } from '../middleware/middlewares';

const router = Router();

const trollController = new TrollController();

// requre authentication for this page
// router.get('*', checkUser);

// create a troll
router.post('/troll/post', uploadMiddleware, (request: Request, response: Response) => {
    return trollController.createTroll(request, response);
});

// get all trolls
router.get('/troll/all', (request: Request, response: Response) => {
    return trollController.getAllTrolls(request, response);
});

// get troll by id
router.get('/troll/:id', (request: Request, response: Response) => {
    return trollController.getTrollById(request, response);
});

// update troll
router.put('/troll/:id', requireAuth, (request: Request, response: Response) => {
    return trollController.updateTroll(request, response);
});

// delete troll
router.delete('troll/:id', requireAuth, (request: Request, response: Response) => {
    return trollController.deleteTroll(request, response);
});

// add comment to post 
router.post('/troll/:id/comment', requireAuth, (request: Request, response: Response) => {
    return trollController.addComment(request, response);
});

// update likes of a troll post
router.post('/troll/:id/like', requireAuth, (request: Request, response: Response) => {
    return trollController.updateLikes(request, response);
});

// get troll images
router.get('/troll/images/:id', (request: Request, response: Response) => {
    return trollController.getTrollImages(request, response);
});

// get troll videos
router.get('/troll/videos/:id', (request: Request, response: Response) => {
    return trollController.getTrollVideos(request, response);
});

export default router;