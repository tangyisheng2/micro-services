import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    if (!req.session?.jwt) {
        // "?" checks if the internal property exist or not
        return res.send({ currentUser: null });
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        // JWT will throw an error is verify failed
        res.send({ currentUser: payload });
    } catch (error) {
        return res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };
