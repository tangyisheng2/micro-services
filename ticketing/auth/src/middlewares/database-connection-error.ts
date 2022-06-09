import { ValidationError } from 'express-validator';

export class DatabaseConnectionError extends Error {
    statusCode = 500;
    public reason = 'Failed to connect to database!';

    constructor() {
        super();

        // Extending a built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
