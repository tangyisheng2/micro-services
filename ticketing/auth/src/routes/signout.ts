import express, { Router } from 'express';

const router = express.Router();
/**
 * This function signs out a user by clearing all the cookies
 */
router.post('/api/users/signout', (req, res) => {
    req.session = null;

    res.send({});
});

export { router as signoutRouter };
