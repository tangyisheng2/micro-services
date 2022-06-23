import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';

import {
    currentUser,
    errorHandler,
    NotFoundError,
} from '@tangyisheng2-ticket/common';
import cookieSession from 'cookie-session';
import { indexTicketRouter } from './routes';
import { createTicketRouter } from './routes/new';
import { showTicketsRouter } from './routes/showTicket';

const app = express();
app.set('trust proxy', true); // Traffic is proxyed to express, and trust the traffic
app.use(json());
app.use(
    cookieSession({
        signed: false, // Disable encryption
        // secure: true, // Require HTTPS connection
    })
);
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketsRouter);
app.use(indexTicketRouter);

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
