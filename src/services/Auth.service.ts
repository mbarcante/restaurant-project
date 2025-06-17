import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; // Import jsonwebtoken

dotenv.config(); // Load environment variables from .env file

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = "1h";

export class AuthService {
	async hashPassword(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		return hashedPassword;
	}

	async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		const isMatch = await bcrypt.compare(password, hashedPassword);
		return isMatch;
	}

	generateToken(payload: object): string {
		if (
			!JWT_SECRET ||
			JWT_SECRET === "fallback_jwt_secret_please_change_me_in_production"
		) {
			throw new Error(
				"JWT_SECRET is not defined. Please set it in your environment variables.",
			);
		}
		const token = jwt.sign(payload, JWT_SECRET as string, {
			expiresIn: JWT_EXPIRATION_TIME,
		});
		return token;
	}

	verifyToken(token: string): unknown {
		if (
			!JWT_SECRET ||
			JWT_SECRET === "fallback_jwt_secret_please_change_me_in_production"
		) {
			throw new Error(
				"JWT_SECRET is not defined. Please set it in your environment variables.",
			);
		}
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			return decoded;
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				throw new Error("Token has expired.");
			} else if (error instanceof jwt.JsonWebTokenError) {
				throw new Error("Invalid token.");
			}
			throw new Error("Invalid or expired token.");
		}
	}
}

export default new AuthService();
