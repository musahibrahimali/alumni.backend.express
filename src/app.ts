import express, {Application,Response, Request, Errback, NextFunction} from 'express';
import passport from 'passport';
import logger from 'morgan';
import cookieParser from "cookie-parser";
import cors from 'cors';
import createHttpError from "http-errors";
import helmet from "helmet";
import * as http from 'http';
import * as socketio from 'socket.io';

// util imports
import {
    appRoutes, 
    authRoutes, 
    eventRoutes, 
    jobRoutes, 
    blogRoutes,
    trollRoutes,
} from './routes/routes';
import {Host, Port} from "./config/config";
import {corsOptions} from "./config/cors";
import {connectDatabase} from './database/database';

// create an application
const app:Application = express(); // create express app
const server: http.Server = http.createServer(app); // create http server
const io: socketio.Server = new socketio.Server(); // create io server
io.attach(server); // attach socket io to the server

app.set("trust proxy", 1); // set trust proxy to 1

// middlewares
app.use(express.json()); // format json data
app.use(express.urlencoded({ extended: true })); // add url encoding 
app.use(logger('dev')); // log details for development
app.use(cookieParser()); // mmanaging cookies
app.use(cors(corsOptions)); // adding cross framework access
app.use(helmet()); // add some basic layer security to the app
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // manage sessions

/* connect to database */
connectDatabase();

// Routes
app.use(appRoutes);
app.use(authRoutes);
app.use(eventRoutes);
app.use(jobRoutes);
app.use(blogRoutes);
app.use(trollRoutes);

// catch 404 and forward to error handler
app.use((request:Request, response:Response, next:NextFunction) => {
    next(createHttpError(404));
});

// error handler
app.use((err:Errback | any, request:Request, response:Response, next: NextFunction) => {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    // render the error page
    response.status(err.status || 500);
    next();
});

// Start server
const application: Application | any = server.listen(Port, Host, () => {
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

