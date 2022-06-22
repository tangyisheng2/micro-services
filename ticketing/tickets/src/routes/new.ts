import express, { Request, Response } from 'express';
import { currentUser, requireAuth } from '@tangyisheng2-ticket/common';

const router = express.Router();

router.post(
    '/api/tickets',
    currentUser,
    requireAuth,
    (req: Request, res: Response) => {
        console.log(req.get('set-cookie'));
        return res.status(200).send({});
    }
);

export { router as createTicketRouter };
