import { requireAuth } from '@tangyisheng2-ticket/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

/**
 * URL: /api/orders
 * Method: GET
 * Body: -
 * Comment: Get all active orders for the currentUser
 */
router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({
        userId: req.currentUser!.id,
    }).populate('ticket');

    res.send(orders);
});

export { router as indexOrderRouter };
