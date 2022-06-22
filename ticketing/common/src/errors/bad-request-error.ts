import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode: number = 400;

    constructor(public message: string) {
        super(message);
        // Magic line of code: setting prototype
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined }[] {
        return [{ message: this.message }];
    }
}
