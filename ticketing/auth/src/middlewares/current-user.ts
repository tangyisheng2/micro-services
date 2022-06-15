import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * This interface defined the payload structure
 */
interface UserPayload {
    id: string;
    email: string;
}

/**
 * This line modifieds the existing interface defiend by the package
 */
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

/**
 * This middleware extract the JWT payload and set it on req.currentUser
 * @param req
 * @param res
 * @param next
 */
export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload;
        req.currentUser = payload;
    } catch (error) {}
    return next();
};
