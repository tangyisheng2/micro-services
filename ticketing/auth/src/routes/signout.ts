import express, { Router } from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    res.send('sign out!');
});
export default router;
