import { Knex } from "knex";
import crypto from 'crypto';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    admin: boolean;
    created_at: Date;
    updated_at: Date;
}

export type UserCreate = Omit<User, 'id' | 'created_at' | 'updated_at'>;

class UserModel {
    private knex: Knex;
    constructor(knexInstance: Knex) {
        this.knex = knexInstance;
    }
     getAllUsers = async (): Promise<void> => {
        const result = await this.knex.raw('SELECT id, name, email, admin FROM users;');
        return result.rows;
    }

    getUserById = async (id: number): Promise<User | null> => {
        const result = await this.knex.raw('SELECT id, name, email, admin FROM users WHERE id = ?;', [id]);
        return result.rows[0] || null;
    }

    createUser = async (userData: UserCreate): Promise<User> => {
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error('Name, email, and password are required fields.');
        };
        function hashPassword(password: string, salt: string): string {
            const hash = crypto.createHash('sha256');
            hash.update(salt + password);
            return hash.digest('hex');
        }
        function generateSalt() {
            return crypto.randomBytes(16).toString('hex');
        }
        const salt = generateSalt();
        const password = userData.password;
        const hashedPassword = hashPassword(password, salt);
        userData.password = hashedPassword;
        userData.admin = userData.admin || false;
        console.log(String(userData.password));

        const result = await this.knex.raw(
            `INSERT INTO users (name, email, password, admin) VALUES (?, ?, ?, ?) RETURNING id, name, email, admin, created_at, updated_at;`,
            [userData.name || "Lucas", userData.email, userData.password, userData.admin]
        );
        return result.rows[0];
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