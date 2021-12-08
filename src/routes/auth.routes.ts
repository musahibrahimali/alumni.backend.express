import {Request, Response, Router} from "express";
import passport from "passport";
import {AuthController} from "../controllers/controllers";

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
router.post(
    "/facebook", 
    passport.authenticate("facebookToken", {
        failureRedirect: "/login",
        failureFlash: true,
        failureMessage: "Facebook login failed",
        session: true
    }), 
    (request:Request, response:Response) => {
        return authController.facebookLogin(request, response);
    }
);

// google login
router.post(
    "/google",
    passport.authenticate("googleToken", {
        failureRedirect: "/login",
        failureFlash: true,
        failureMessage: "Google login failed",
        session: true
    }),
    (request:Request, response:Response) => {
        return authController.googleLogin(request, response);
    }
);

// log out user
router.get("/logout", (request:Request, response:Response) => {
    return authController.logOut(request, response);
});

export default router;