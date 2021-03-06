const _port: string | any = process.env.PORT;
const Port : number = parseInt(_port, 10) || 5000;

export default {
    google: {
        GOOGLE_CLIENT_ID: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        GOOGLE_CLIENT_SECRET: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        GOOGLE_CALLBACK_URL: "http://localhost:5000/users/google/callback"
    },
    facebook: {
        FACEBOOK_APP_ID: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        FACEBOOK_APP_SECRET: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        FACEBOOK_CALLBACK_URL: "http://localhost:5000/users/facebook/callback"
    },
    cors:{
        credentials: true,
        origin: process.env.ORIGIN || 'http://localhost:3000',
        optionsSuccessStatus: 200,
        methods: "GET,POST,PUT,DELETE",
    },
    mongodb:{
        DB_URL: process.env.MONGODB_URI || 'mongodb://localhost/alumni',
    },
    env: {
        Port: Port,
        Host: process.env.HOST || 'localhost',
    },
    origin:{
        CLIENT_URL: process.env.ORIGIN || 'http://localhost:3000',
    },
    session: {
        JWT_SECRET:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

        cookieKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        
        JWT_EXPIRES_IN: 60 * 60 * 24 * 1,
        SALT_ROUNDS: 10,
    },
};