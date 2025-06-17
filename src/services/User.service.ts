// src/services/UserService.ts
import UserModel from '../models/User.model'; // Import the UserModel class
import authServiceInstance, { AuthService } from './Auth.service';
import { User, UserCreate } from '../interfaces/User.interface'; // Assuming interfaces are here
import db from '../db'; // Your knex instance. Ensure this is imported correctly.

export class UserService {
    private userModel: UserModel;
    private authService: AuthService;

    constructor() {
        this.userModel = new UserModel(db);
        // Assign the imported singleton instance to the property
        this.authService = authServiceInstance;
    }

    /**
     * Registers a new user, including hashing their password.
     * @param userData The plain-text user data from the client.
     * @returns The newly created user object (with hashed password).
     */
    async registerUser(userData: UserCreate): Promise<User> {
        const hashedPassword = await this.authService.hashPassword(userData.password);

        const newUserToCreate: UserCreate = {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            admin: userData.admin || false
        };

        const newUser = await this.userModel.createUser(newUserToCreate);

        return newUser;
    }

    /**
     * Retrieves all users from the database.
     * @returns An array of user objects.
     */
    async getAllUsers(): Promise<User[]> {
        return this.userModel.getAllUsers();
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userModel.getUserByEmail(email);
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.userModel.getUserById(userId);
    }

    async updateUser(userId: number, userData: Partial<UserCreate>): Promise<User | null> {
        return this.userModel.updateUser(userId, userData);
    }

    async deleteUser(userId: number): Promise<void> {
        await this.userModel.deleteUser(userId);
    }

    // Example of a future login method that would use comparePassword:
    // async login(email: string, password: string): Promise<User | null> {
    //     const user = await this.userModel.getUserByEmail(email); // Assume UserModel has this method
    //     if (!user) {
    //         return null; // User not found
    //     }
    //     const isPasswordValid = await this.authService.comparePassword(password, user.password);
    //     if (!isPasswordValid) {
    //         return null; // Invalid password
    //     }
    //     return user; // Login successful
    // }

    // Add other user-related business logic methods here (e.g., getUserById, updateUser, deleteUser)
}

// Export a singleton instance of the UserService
export default new UserService();