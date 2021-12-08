const JWT_SECRET = "jwt-secret";

const JWT_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days
const SALT_ROUNDS = 10; // salt rounds

// google auth credentials
const GOOGLE_CLIENT_ID = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const GOOGLE_CLIENT_SECRET = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// facebook auth credentials
const FACEBOOK_APP_ID = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const FACEBOOK_APP_SECRET = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export { 
    JWT_SECRET,
    JWT_EXPIRES_IN,
    SALT_ROUNDS, 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET
};