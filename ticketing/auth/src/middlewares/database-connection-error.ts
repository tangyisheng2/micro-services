import { ValidationError } from 'express-validator';

export class DatabaseConnectionError extends Error {
    constructor() {
        super();

        // Extending a built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
