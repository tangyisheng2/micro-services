import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');

        const res = await scryptAsync(password, salt, 64);
        const buf = res as Buffer; // scryptAsync normally returns unknown, convert to Buffer type
        return `${buf.toString('hex')}.${salt}`;
    }

    static compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        return scryptAsync(suppliedPassword, salt, 64).then((res) => {
            const buf = res as Buffer; // scryptAsync normally returns unknown, convert to Buffer type
            return buf.toString('hex') === hashedPassword;
        });
    }
}
