import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();
/**
 * This function gets the info of the current signed user
 * by looking up the JWT in the cookies
 */
router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
