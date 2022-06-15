import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true); // Traffic is proxyed to express, and trust the traffic
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(
    cookieSession({
        signed: false,
        secure: true, // Require HTTPS connection
    })
);

app.all('*', () => {
    throw new NotFoundError();
});

// Async version
// app.all('*', async (req, res, next) => {
//     next( new NotFoundError());
// });
// Or use express-async-errors

app.use(errorHandler);

mongoose
    .connect('mongodb://auth-mongo-srv:27017/auth')
    .then(() => {
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    })
    .catch((err) => console.log(err));
