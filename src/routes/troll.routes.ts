import { Request, response, Response, Router } from "express";
import { TrollController } from '../controllers/troll.controller';
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
router.put('/troll/:id', (request: Request, response: Response) => {
    return trollController.updateTroll(request, response);
});

// delete troll
router.delete('troll/delete', (request: Request, response: Response) => {
    return trollController.deleteTroll(request, response);
});

// add comment to post 
router.post('/troll/comment', (request: Request, response: Response) => {
    return trollController.addComment(request, response);
});

// update likes of a troll post
router.post('/troll/like', (request: Request, response: Response) => {
    return trollController.updateLikes(request, response);
});

// share post 
router.post('/troll/share', (request: Request, response: Response) => {
    return trollController.updateShares(request, response);
});

export default router;