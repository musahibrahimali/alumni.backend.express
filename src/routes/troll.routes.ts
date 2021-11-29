import { Request, Response, Router } from "express";
import { TrollController } from '../controllers/troll.controller';

const router = Router();

const trollController = new TrollController();

// create a troll
router.post('troll', (request: Request, response: Response) => {
    return trollController.createTroll(request, response);
});

// get all trolls
router.get('troll', (request: Request, response: Response) => {
    return trollController.getAllTrolls(request, response);
});

// get troll by id
router.get('troll/:id', (request: Request, response: Response) => {
    return trollController.getTrollById(request, response);
});

// get troll by user
router.get('troll/:user', (request: Request, response: Response) => {
    return trollController.getTrollByUser(request, response);
});

// update troll
router.put('troll/:id', (request: Request, response: Response) => {
    return trollController.updateTroll(request, response);
});

// delete troll
router.delete('troll/:id', (request: Request, response: Response) => {
    return trollController.deleteTroll(request, response);
});

export default router;