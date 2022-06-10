import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    error = 'Failed to connect to database!';

    constructor() {
        super('Failed to connect to database!');

        // Extending a built-in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.error }];
    }
}
