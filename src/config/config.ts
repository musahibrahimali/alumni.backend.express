const _port: string | any = process.env.PORT;
const Port : number = parseInt(_port, 10) || 5000;

export default {
    google: {
        GOOGLE_CLIENT_ID: "651347700714-mnohbpu1ap5lhuiu8sh0c3pd4fecncfp.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",
        GOOGLE_CALLBACK_URL: "http://localhost:5000/users/google/callback"
    },
    facebook: {
        FACEBOOK_APP_ID: "931776870810858",
        FACEBOOK_APP_SECRET: "90db549cd15a5731bd5ae3f62f63072c",
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
        JWT_SECRET:"Yp3s6v9y$B&E(H+MbQeThWmZq4t7w!z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E)H@McQfThWmZq4t7w!z%C*F-JaNdRgUkXn2r5u8x/A?D(G+KbPeShVmYq3s6v9y$B&E)H@McQfTjWnZr4u7w!z%C*F-JaNdRgUkXp2s5v8y/A?D(G+KbPeShVmYq3t6w9z$C&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&F)J@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@McQeThWmZq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?D(G+KbPeShV",

        cookieKey: "Yp3s6v9y$B&E(H+MbQeThWmZq4t7w!z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E)H@McQfThWmZq4t7w!z%C*F-JaNdRgUkXn2r5u8x/A?D(G+KbPeShVmYq3s6v9y$B&E)H@McQfTjWnZr4u7w!z%C*F-JaNdRgUkXp2s5v8y/A?D(G+KbPeShVmYq3t6w9z$C&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&F)J@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@McQeThWmZq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?D(G+KbPeShV",
        
        JWT_EXPIRES_IN: 60 * 60 * 24 * 1,
        SALT_ROUNDS: 10,
    },
};


