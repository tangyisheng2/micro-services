import express, { Request, Response } from 'express';
import {
    currentUser,
    requireAuth,
    TicketCreatedPublisher,
    validateRequest,
} from '@tangyisheng2-ticket/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
    '/api/tickets',
    currentUser,
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;

        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id,
        });

        await ticket.save();

        await new TicketCreatedPublisher(natsWrapper.client)
            .publish({
                id: ticket.id,
                version: ticket.version,
                title: ticket.title,

                price: ticket.price,
                userId: ticket.userId,
            })
            .catch((err) => {
                // console.log(natsWrapper.client);
                console.log(err.message);
            }); // Returns Promise<null>

        res.status(201).send(ticket);
    }
);

export { router as createTicketRouter };
