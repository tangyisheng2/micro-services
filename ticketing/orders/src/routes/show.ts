import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * URL: /api/orders/:id
 * Method: GET
 * Body: -
 * Comment: Get details of a specific order
 */
router.get('/api/orders/:id', async (req: Request, res: Response) => {
    res.send({});
});

export { router as showOrderRouter };
