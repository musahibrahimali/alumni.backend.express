import express, {Application,Response, Request, Errback, NextFunction} from 'express';
import logger from 'morgan';
import cookieParser from "cookie-parser";
import cors from 'cors';
import createHttpError from "http-errors";
import helmet from "helmet";

// util imports
import {appRoutes,authRoutes} from './routes/routes';
import {Host, Port} from "./config/config";
import {corsOptions} from "./config/cors";
import {connectDatabase} from './database/database';

// create an application
const app:Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());

/* connect to database */
connectDatabase();

// Routes
app.use(appRoutes);
app.use(authRoutes);

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
const server: Application | any = app.listen(Port, Host, () => {
    const {port, address} = server.address();
    console.log(`Server Listening at ${address} on port ${port}`);
});