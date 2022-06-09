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
        const formattedErrors = err.errors.map((error) => {
            // Use return to fix: Error: Cannot set headers after they are sent to the client
            return {
                message: error.msg,
                field: error.param,
            };
        });
        res.status(400).send(formattedErrors);
    }

    if (err instanceof DatabaseConnectionError) {
        console.log('Handling DB Error');
    }

    res.status(400).send({
        msg: err.message,
    });
};
