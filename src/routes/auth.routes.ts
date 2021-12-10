import {Request, Response, Router} from "express";
import passport from "passport";
import {AuthController} from "../controllers/controllers";
import { requireAuth } from "../middleware/auth.middleware";

// client url
const CLIENT_URL = "http://localhost:3000/";

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
        successRedirect: CLIENT_URL,
        failureRedirect: '/login',
        failureFlash: true,
        failureMessage: "Google login failed",
        session: false,
    })
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
        successRedirect: CLIENT_URL,
        failureRedirect: '/login',
        failureFlash: true,
        failureMessage: "Google login failed",
        session: false,
    })
);

router.get("/login/success", requireAuth, (request:Request, response:Response) => {
    return authController.socialLogin(request, response);
});

// log out user
router.get("/logout", (request:Request, response:Response) => {
    return authController.logOut(request, response);
});

export default router;