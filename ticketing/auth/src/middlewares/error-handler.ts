import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        // Use return to fix: Error: Cannot set headers after they are sent to the client
        return res.status(err.statusCode).send(err.serializeErrors());
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong!' }],
    });
};
