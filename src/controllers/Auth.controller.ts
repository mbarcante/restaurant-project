import { Request, Response } from 'express';
// You'll need to import the class type AND the singleton instance
import { AuthManagerService } from '../services/AuthManager.service'; // For type
import authManagerServiceInstance from '../services/AuthManager.service'; // For instance

class AuthController {
    private authManagerService: AuthManagerService;

    constructor() {
        // --- CRITICAL CORRECTION 1: Use the singleton instance ---
        // DO NOT use 'new AuthManagerService()' here.
        // This would create a NEW instance of AuthManagerService every time AuthController is instantiated.
        // Instead, use the singleton instance you're exporting from AuthManager.service.ts.
        this.authManagerService = authManagerServiceInstance;
    }

    // --- CRITICAL CORRECTION 2: Controller methods MUST send a response and return Promise<void> ---
    // Controller methods in Express don't return data directly to Express; they send an HTTP response.
    // Therefore, their return type should be Promise<void>.
    login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body; // Destructure credentials
        try {
            // Delegate to the AuthManagerService for login logic
            const result = await this.authManagerService.login(email, password);

            if (result) {
                const { user, token } = result;

                // --- CRITICAL CORRECTION 3: Filter sensitive data before sending to client ---
                // The 'user' object from the service might contain the hashed password.
                // Create a clean object with only public user data to send to the client.
                const userResponse = {
                    id: user.id,
                    email: user.email,
                    name: user.name, // Assuming 'name' exists on User interface
                    // Add other non-sensitive properties you want to expose
                    // e.g., role: user.role
                };

                // Send a 200 OK response with the public user data and the JWT
                res.status(200).json({ user: userResponse, token });
            } else {
                // If service returns null, it means credentials were invalid
                res.status(401).json({ error: 'Invalid credentials.' });
            }
        } catch (error) {
            // --- CRITICAL CORRECTION 4: Handle unexpected errors from the service ---
            console.error('Error during login:', error);
            // In a real app, you might differentiate between types of errors
            // (e.g., a specific error type for 'UserNotFound' vs. generic 'Internal Server Error')
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

// Export the singleton instance of the AuthController
export default new AuthController();