import { NotFoundError, validateRequest } from '@tangyisheng2-ticket/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    const response = await Ticket.findById(id);

    if (!response) {
        throw new NotFoundError();
    }

    res.send(response);
});

export { router as showTicketsRouter };
