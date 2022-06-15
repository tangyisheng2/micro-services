import express, { Router } from 'express';

const router = express.Router();
/**
 * This function signs out a user by clearing all the cookies
 */
router.post('/api/users/signout', (req, res) => {
    res.send('sign out!');
});

export { router as signoutRouter };
