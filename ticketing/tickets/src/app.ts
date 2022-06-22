import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';

import { errorHandler, NotFoundError } from '@tangyisheng2-ticket/common';
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
