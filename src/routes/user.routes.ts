import {Request, Response, Router} from "express";
import passport from "passport";
import {UserController} from "../controllers/controllers";
import { ensureAuth } from "../middleware/auth.middleware";

const router = Router();
const userController = new UserController();

// log in user
router.post("/login", (request:Request, response:Response) => {
    return userController.SignIn(request, response);
});

// register user
router.post("/signup", (request:Request, response:Response) => {
    return userController.SignUp(request, response);
});

// facebook login
router.get(
    "/facebook",
    passport.authenticate("facebook", {
        scope: ["public_profile", "email"],
        session: false,
    })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { 
        failureRedirect: '/login',
        failureFlash: true,
        failureMessage: "Google login failed",
        session: false,
    }),
    (request:Request, response:Response) => {
        return userController.FacebookLogin(request, response);
    }
)

// google login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/',
        failureFlash: true,
        failureMessage: "Google login failed",
        session: false,
    }),
    (request:Request, response:Response) => {
        return userController.GoogleLogin(request, response);
    }
);

router.get("/done", (request:Request, response:Response) => {
    return userController.SocialLogin(request, response);
});

// log out user
router.get("/logout", (request:Request, response:Response) => {
    return userController.LogOut(request, response);
});

export default router;