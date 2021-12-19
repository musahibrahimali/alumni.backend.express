import { Request, Response, Router } from "express";
import { TrollController } from '../controllers/troll.controller';
import { checkUser, requireAuth } from "../middleware/auth.middleware";

const router = Router();

const trollController = new TrollController();

// requre authentication for this page
// router.get('*', checkUser);

// create a troll
router.post('/troll/post', (request: Request, response: Response) => {
    return trollController.createTroll(request, response);
});

// get all trolls
router.get('/troll/post/all', (request: Request, response: Response) => {
    return trollController.getAllTrolls(request, response);
});

// get troll by id
router.get('/troll/:id', requireAuth, (request: Request, response: Response) => {
    return trollController.getTrollById(request, response);
});

// get troll by user
router.get('/troll/:user', requireAuth, (request: Request, response: Response) => {
    return trollController.getTrollByUser(request, response);
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

export default router;