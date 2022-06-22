import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '@tangyisheng2-ticket/common';
import { validateRequest } from '@tangyisheng2-ticket/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();
/**
 * This function signs in a user and return the JWT.
 */
router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email mest be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordMatch = await Password.compare(
            existingUser.password,
            password
        );

        if (!passwordMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        // Store it in session object
        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };
