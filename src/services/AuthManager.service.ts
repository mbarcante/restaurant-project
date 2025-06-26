import type { User, UserCreate } from "../interfaces/User.interface"; // Assuming User interface is defined here
import authServiceInstance from './Auth.service';
import type { AuthService } from './Auth.service';
import userServiceInstance from "./User.service";
import type { UserService } from "./User.service";
import  {userModelSingleton} from '../config/db';

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
    
    async register(userData: User): Promise<{ user: User, token: string } | null> {
        
        const hashedPassword = await this.authService.hashPassword(userData.password);
        const newUser = await userModelSingleton.createUser({ ...userData, password: hashedPassword });
        if (!newUser) {
            return null;
        }
        const tokenPayload = {
            id: newUser.id,
            email: newUser.email,
            admin: newUser.admin
        };
        const token = this.authService.generateToken(tokenPayload);
        return { user: newUser, token };
    }
}

export default new AuthManagerService();