import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();
/**
 * This function signs up a user and returns the user id, email, and JWT.
 * Sign up includes: Check if there is an existing user, and add new
 * record to database.
 */
router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must between 4 - 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        // throw new BadRequestError(`Email in use ${email}`);

        // Check if user exists
        // User.findOne({ email }).then((existingUser) => {

        //     // If user already exist
        //     if (existingUser) {
        //         console.log(`Email in use ${email}`);
        //         throw new BadRequestError(`Email in use ${email}`);
        //     }
        //     // todo: encrypt password

        //     // If user not exist, create it
        //     const user = User.build({ email, password });

        //     return user.save().then((userResult) => {
        //         return res.status(201).send(userResult);
        //     });
        // });

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password });
        await user.save();
        // Generate JWT

        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_KEY!
        );

        // Store it in session object
        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user);
    }
);

export { router as signupRouter };
