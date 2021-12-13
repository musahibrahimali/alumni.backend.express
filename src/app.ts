import express, {Application} from 'express';
import passport from 'passport';
import logger from 'morgan';
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import cors from 'cors';
import helmet from "helmet";
import {connectDatabase} from './utils/utils';
import config from './config/config';
import * as http from 'http';
import * as socketio from 'socket.io';
import './utils/passport.config';

// util imports
import {
    appRoutes, 
    userRoutes, 
    eventRoutes, 
    jobRoutes, 
    blogRoutes,
    trollRoutes,
    adminRoutes,
} from './routes/routes';

// create an application
const app:Application = express(); // create express app
const server: http.Server = http.createServer(app); // create http server
const io: socketio.Server = new socketio.Server(); // create io server
io.attach(server); // attach socket io to the server

// middlewares
app.use(express.json()); // format json data
app.use(express.urlencoded({ extended: true })); // add url encoding 
app.use(logger('dev')); // log requests
app.use(cookieParser()); // parse cookies
app.use(cors(config.cors)); // enable cors
app.use(helmet()); // add security headers
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey],
}));

/* connect to database */
connectDatabase();
// initialize passport
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // initialize passport

// Routes
app.use(appRoutes);
app.use('/users',userRoutes);
app.use(eventRoutes);
app.use(jobRoutes);
app.use(blogRoutes);
app.use(trollRoutes);
app.use('/admin', adminRoutes);

// Start server
const application: Application | any = server.listen(config.env.Port, config.env.Host, () => {
    const {port, address} = application.address();
    console.log(`Server Ready and Listening at ${address} on port ${port} -> (http://localhost:${port})`);
});

// socket io
io.on('connection', (socket: socketio.Socket) => {
    console.log('connection');
    socket.emit('status', 'Hello from Socket.io');

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

