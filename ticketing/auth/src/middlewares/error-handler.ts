import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionError } from './database-connection-error';
import { RequestValidationError } from './request-validation-error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof RequestValidationError) {
        console.log('Handling Validation Error');
    }

    if (err instanceof DatabaseConnectionError) {
        console.log('Handling DB Error');
    }

    res.status(400).send({
        msg: err.message,
    });
};
