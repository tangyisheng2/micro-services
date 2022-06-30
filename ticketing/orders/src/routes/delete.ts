import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * URL: /api/orders/:id
 * Method: DELETE
 * Body: -
 * Comment: Cancel the order
 */
router.delete('/api/orders/:id', async (req: Request, res: Response) => {
    res.send({});
});

export { router as deleteOrderRouter };
