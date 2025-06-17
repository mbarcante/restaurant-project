import userServiceInstance, { UserService } from "./User.service";
import authServiceInstance, { AuthService } from './Auth.service';
import { User } from "../interfaces/User.interface"; // Assuming User interface is defined here



export class AuthManagerService {
    private userService: UserService;
    private authService: AuthService;
    constructor() {
        this.userService = userServiceInstance;
        this.authService = authServiceInstance;
    }
    async login(email: string, password: string): Promise<{ user: User, token: string } | null> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            return null; // User not found
        }
        const tokenPayload = {
            id: user.id,
            email: user.email,
            admin: user.admin
        };
        const isPasswordValid = await this.authService.comparePassword(password, user.password);
        if (isPasswordValid) {
            const token = this.authService.generateToken(tokenPayload);
            return { user, token };
        } else {
            return null;
        }
    }
}

export default new AuthManagerService(); 