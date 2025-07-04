import { User, UserCreate } from '../interfaces/User.interface'; 
import  {userModelSingleton} from '../config/db'; 

export class UserService {

    async getAllUsers(): Promise<User[]> {
        return userModelSingleton.getAllUsers();
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return userModelSingleton.getUserByEmail(email);
    }

    async getUserById(userId: number): Promise<User | null> {
        return userModelSingleton.getUserById(userId);
    }

    async updateUser(userId: number, userData: Partial<UserCreate>): Promise<User | null> {
        return userModelSingleton.updateUser(userId, userData);
    }

    async deleteUser(userId: number): Promise<void> {
        await userModelSingleton.deleteUser(userId);
    }
}

export default new UserService();