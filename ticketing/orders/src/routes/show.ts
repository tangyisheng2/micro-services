import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
} from '@tangyisheng2-ticket/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

/**
 * URL: /api/orders/:id
 * Method: GET
 * Body: -
 * Comment: Get details of a specific order
 */
router.get(
    '/api/orders/:id',

    requireAuth,
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id).populate('ticket');
        // Check if the order exist
        if (!order) {
            throw new NotFoundError();
        }
        // Check if the user own this order
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        res.send(order);
    }
);

export { router as showOrderRouter };
