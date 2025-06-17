import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION_TIME = '1h'; 

export class AuthService {
    /**
     * Hashes a plain-text password using bcrypt.
     * @param password The plain-text password.
     * @returns The hashed password string.
     */
    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    }

    /**
     * Compares a plain-text password with a hashed password.
     * @param password The plain-text password to compare.
     * @param hashedPassword The hashed password from the database.
     * @returns True if passwords match, false otherwise.
     */
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }

    /**
     * Generates a JSON Web Token (JWT) for a given payload.
     * @param payload The data to include in the token (e.g., { userId: 123, role: 'admin' }).
     * @returns The signed JWT string.
     */
    generateToken(payload: object): string { // 'object' can be refined to a specific interface like TokenPayload
        if (!JWT_SECRET || JWT_SECRET === 'fallback_jwt_secret_please_change_me_in_production') {
            // It's critical to ensure the secret is loaded for production
            throw new Error('JWT_SECRET is not defined. Please set it in your environment variables.');
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
        return token;
    }

    /**
     * Verifies a JSON Web Token (JWT).
     * @param token The JWT string to verify.
     * @returns The decoded payload if the token is valid, throws an error otherwise.
     */
    verifyToken(token: string): any { // Return type can be refined based on your payload interface
        if (!JWT_SECRET || JWT_SECRET === 'fallback_jwt_secret_please_change_me_in_production') {
            throw new Error('JWT_SECRET is not defined. Please set it in your environment variables.');
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            // jwt.verify can throw various errors (TokenExpiredError, JsonWebTokenError, etc.)
            // You might want to log the error or re-throw a more specific custom error here.
            throw new Error('Invalid or expired token.'); // Generic error for the caller
        }
    }
}

export default new AuthService();