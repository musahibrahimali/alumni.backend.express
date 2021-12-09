import mongoose from 'mongoose';
import SocialUserSchema from '../schemas/social.schema';

export const SocialUserModel = mongoose.model("social_user", SocialUserSchema);
