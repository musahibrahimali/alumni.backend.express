import passport from "passport";
import googleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import config from "../config/config";
import { UserModel } from '../models/user/user.model';

// google auth details
const GoogleStrategy = googleStrategy.Strategy;
// facebook auth details
const FacebookStrategy = facebookStrategy.Strategy;

// serialize user
passport.serializeUser((user:any, done) => {
    done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
        done(null, user);
    });
});
    
passport.use(
    new GoogleStrategy(
        {
            clientID: config.google.GOOGLE_CLIENT_ID,
            clientSecret: config.google.GOOGLE_CLIENT_SECRET,
            callbackURL: config.google.GOOGLE_CALLBACK_URL
        },
        async (_accessToken:any, _refreshToken:any, profile:any, done) => {
            await UserModel.findOne({ socialId: profile.id }).then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    const newUser = new UserModel({
                        socialId: profile.id,
                        email: profile.emails[0].value,
                        displayName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        image: profile.photos[0].value,
                    })
                    newUser.save().then((user:any) => {
                        done(null, user);
                    });
                }
            });
        }
));

passport.use(
    new FacebookStrategy(
        {
            clientID: config.facebook.FACEBOOK_APP_ID,
            clientSecret: config.facebook.FACEBOOK_APP_SECRET,
            callbackURL: config.facebook.FACEBOOK_CALLBACK_URL,
        },
        async (_accessToken: any, _refreshToken: any, profile: any, done) => {
            await UserModel.findOne({socialId: profile.id}).then((user) => {
                if(user){
                    done(null, user);
                }else{
                    const newUser = new UserModel({
                        socialId: profile.id,
                        email: profile.emails[0].value,
                        displayName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        image: profile.photos[0].value,
                    });
                    newUser.save().then((user:any) => {
                        done(null, user);
                    });
                }
            });
        }
    )
);
