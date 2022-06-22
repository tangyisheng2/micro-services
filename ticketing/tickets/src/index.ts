import 'express-async-errors';
import mongoose from 'mongoose';

import { app } from './app';

if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
}

mongoose
    .connect('mongodb://ticket-mongo-srv:27017/ticket')
    .then(() => {
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    })
    .catch((err) => console.log(err));
