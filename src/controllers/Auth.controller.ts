import type { Request, Response } from "express";
import type { AuthManagerService } from "../services/AuthManager.service"; // For type
import authManagerServiceInstance from "../services/AuthManager.service"; // For instance

class AuthController {
	private authManagerService: AuthManagerService;

	constructor() {
		this.authManagerService = authManagerServiceInstance;
	}

	login = async (req: Request, res: Response): Promise<void> => {
		const { email, password } = req.body; // Destructure credentials
		try {
			const result = await this.authManagerService.login(email, password);

			if (result) {
				const { user, token } = result;
				const userResponse = {
					id: user.id,
					email: user.email,
					name: user.name,
					admin: user.admin,
				};

				res.status(200).json({ user: userResponse, token });
			} else {
				res.status(401).json({ error: "Invalid credentials." });
			}
		} catch (error) {
			console.error("Error during login:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	};

	register = async (req: Request, res: Response): Promise<void> => {
		const userData = req.body; 
		try {
			const result = await this.authManagerService.register(userData);

			if (result) {
				const { user, token } = result; 
				const userResponse = {
					email: user.email,
					name: user.name,
				};

				res.status(201).json({ user: userResponse, token });
			} else {
				res.status(400).json({ error: "Registration failed." });
			}
		} catch (error) {
			console.error("Error during registration:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
export default new AuthController();
