import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    currentUser,
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    Subjects,
    validateRequest,
} from '@tangyisheng2-ticket/common';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';
import { TicketUpdatedPublisher } from '../events/ticket-updated-publisher';

const router = express.Router();

router.put(
    '/api/tickets/:id',
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    currentUser,
    requireAuth,
    async (req: Request, res: Response) => {
        let ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser?.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price,
        });

        await ticket.save();
        await new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
        });

        res.send(ticket);
    }
);

export { router as updateTicketRouter };
