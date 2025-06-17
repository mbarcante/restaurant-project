import { Knex } from "knex";
import { User, UserCreate } from "../interfaces/User.interface";

class UserModel {
    private knex: Knex;
    constructor(knexInstance: Knex) {
        this.knex = knexInstance;
    }
     getAllUsers = async (): Promise<User[]> => {
        const result = await this.knex.raw('SELECT id, name, email, admin FROM users;');
        return result.rows;
    }

    getUserById = async (id: number): Promise<User | null> => {
        const result = await this.knex.raw('SELECT id, name, email, admin FROM users WHERE id = ?;', [id]);
        return result.rows[0] || null;
    }

    getUserByEmail = async (email: string): Promise<User | null> => {
         const result = await this.knex.raw('SELECT id, name, email, admin, password FROM users WHERE email = ?;', [email]);
        return result.rows[0] || null;
    }

    async createUser(userData: UserCreate): Promise<User> {
        const [newUser] = await this.knex('users')
            .insert({
                name: userData.name,
                email: userData.email,
                password: userData.password, // This is already hashed
                admin: userData.admin || false, // Ensure default is handled
            })
            .returning('*');

        return newUser;
    }

    updateUser = async (id: number, userData: Partial<UserCreate>): Promise<User | null> => {
        const result = await this.knex.raw(
            `UPDATE users SET name = ?, email = ?, password = ?, admin = ? WHERE id = ? RETURNING *;`,
            [userData.name, userData.email, userData.password, userData.admin, id]
        );
        return result.rows[0] || null;
    }

    deleteUser = async (id: number): Promise<void> => {
        await this.knex.raw('DELETE FROM users WHERE id = ?;', [id]);
        console.log(`User with ID ${id} deleted successfully.`);
    }
}

export default UserModel;