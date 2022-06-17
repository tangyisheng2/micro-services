import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

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
app.use(
    cookieSession({
        signed: false, // Disable encryption
        // secure: true, // Require HTTPS connection
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', () => {
    throw new NotFoundError();
});

// Async version
// app.all('*', async (req, res, next) => {
//     next( new NotFoundError());
// });
// Or use express-async-errors

app.use(errorHandler);

export { app };