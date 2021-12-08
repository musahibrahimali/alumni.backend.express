import passport from 'passport';
import passportFacebook from "passport-facebook";
import googleStrategy from "passport-google-oauth20";
import {
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET,
    FACEBOOK_APP_ID, 
    FACEBOOK_APP_SECRET
} from '../config/keys';

// google auth details
const GoogleStrategy = googleStrategy.Strategy;
const GOOGLE_CALLBACK_URL = "http://localhost:3000/members/google/callback";

// facebook auth details
const FacebookStrategy = passportFacebook.Strategy;
const FACEBOOK_CALLBACK_URL = "http://localhost:3000/members/facebook/callback";


passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL
        },
        function (_accessToken: any, _refreshToken: any, profile: any, done: (arg0: null, arg1: any) => void) {
            done(null, profile);
            console.log(_accessToken, _refreshToken, profile, done);
        }
));

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: FACEBOOK_CALLBACK_URL,
        },
        function (_accessToken: any, _refreshToken: any, profile: any, done: (arg0: null, arg1: any) => void) {
            done(null, profile);
        }
    )
);

passport.serializeUser((user:any, done:any) => {
    done(null, user);
});

passport.deserializeUser((user:any, done:any) => {
    done(null, user);
});
