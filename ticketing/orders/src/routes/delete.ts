import {
    NotAuthorizedError,
    NotFoundError,
    OrderStatus,
    requireAuth,
} from '@tangyisheng2-ticket/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

/**
 * URL: /api/orders/:id
 * Method: DELETE
 * Body: -
 * Comment: Cancel the order
 */
router.delete(
    '/api/orders/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { id: orderId } = req.params;

        // const order = await Order.findOne({});

        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        order.status = OrderStatus.Cancelled;
        await order.save();

        // TODO: Publishing an event saying this is cancelled

        res.status(204).send(order);
    }
);

export { router as deleteOrderRouter };
