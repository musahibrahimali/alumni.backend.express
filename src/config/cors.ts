export const corsOptions = {
    credentials: true,
    origin: process.env.ORIGIN || 'http://localhost:3000',
    optionsSuccessStatus: 200,
}