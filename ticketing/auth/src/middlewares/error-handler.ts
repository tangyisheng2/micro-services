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
        // Use return to fix: Error: Cannot set headers after they are sent to the client
        return res.status(400).send(err.serializedError());
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send(err.serializeErrors());
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong!' }],
    });
};
