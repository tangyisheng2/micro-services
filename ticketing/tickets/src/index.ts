import 'express-async-errors';
import mongoose from 'mongoose';
import crypto from 'crypto';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';

if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
}

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        natsWrapper.connect(
            'ticketing',
            crypto.randomUUID(),
            'http://nats-srv:4222'
        );

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    })
    .catch((err) => console.log(err));
