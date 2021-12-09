import {Request, Response, Router} from "express";
import passport from "passport";
import {AuthController} from "../controllers/controllers";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

// log in user
router.post("/login", (request:Request, response:Response) => {
    return authController.signIn(request, response);
});

// register user
router.post("/signup", (request:Request, response:Response) => {
    return authController.signUp(request, response);
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
        failureRedirect: '/',
        failureFlash: true,
        failureMessage: "Google login failed",
        session: false,
    }),
    (request:Request, response:Response) => {
        return authController.facebookLogin(request, response);
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
        return authController.googleLogin(request, response);
    }
);

router.get('/social/callback', requireAuth, (request:Request, response:Response) => {
    return authController.socialCallback(request, response);
});

// log out user
router.get("/logout", (request:Request, response:Response) => {
    return authController.logOut(request, response);
});

export default router;