import { PassportStatic } from "passport";
import passportFacebook from "passport-facebook";
import googleStrategy from "passport-google-oauth20";
import {
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET,
    FACEBOOK_APP_ID, 
    FACEBOOK_APP_SECRET
} from '../config/keys';
import { SocialUserModel } from '../database/database';

export const initPassport = (passport: PassportStatic) => {
    // google auth details
    const GoogleStrategy = googleStrategy.Strategy;
    const GOOGLE_CALLBACK_URL = "/user/google/callback";
    
    // facebook auth details
    const FacebookStrategy = passportFacebook.Strategy;
    const FACEBOOK_CALLBACK_URL = "/user/facebook/callback";
    
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CALLBACK_URL
            },
            async (_accessToken:any, _refreshToken:any, profile:any, done:any) => {
                const newUser = {
                    socialId: profile.id,
                    email: profile.emails[0].value,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                }

                try {
                    let user = await SocialUserModel.findOne({ socialId: profile.id });

                    if (user) {
                        done(null, user);
                    } else {
                        user = await SocialUserModel.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
    ));
    
    passport.use(
        new FacebookStrategy(
            {
                clientID: FACEBOOK_APP_ID,
                clientSecret: FACEBOOK_APP_SECRET,
                callbackURL: FACEBOOK_CALLBACK_URL,
            },
            async (_accessToken: any, _refreshToken: any, profile: any, done:any) => {
                const newUser = {
                    socialId: profile.id,
                    email: profile.emails[0].value,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                }
                try {
                    let user = await SocialUserModel.findOne({ socialId: profile.id });

                    if (user) {
                        done(null, user);
                    } else {
                        user = await SocialUserModel.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        )
    );
    
    passport.serializeUser((user:any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done:any) => {
        SocialUserModel.findById(id, (err: any, user: any) => done(err, user));
    });
}
