import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super();

        // Extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializedError() {
        return this.errors.map((err) => ({
            message: err.msg,
            field: err.param,
        }));
    }
}
