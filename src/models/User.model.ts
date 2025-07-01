import { Knex } from "knex";
import { User, UserCreate } from "../interfaces/User.interface";

class UserModel {
  private knex: Knex;
  constructor(knexInstance: Knex) {
    this.knex = knexInstance;
  }
  getAllUsers = async (): Promise<User[]> => {
    const result = await this.knex.raw(
      "SELECT id, username, first_name, last_name, email, admin FROM users;"
    );
    return result.rows;
  };

  getUserById = async (id: number): Promise<User | null> => {
    const result = await this.knex.raw(
      "SELECT id, username, first_name, last_name , email, admin FROM users WHERE id = ?;",
      [id]
    );
    return result.rows[0] || null;
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    const result = await this.knex.raw(
      "SELECT id, username, first_name, last_name, email, admin, password FROM users WHERE email = ?;",
      [email]
    );
    return result.rows[0] || null;
  };

  async registerUser(userData: UserCreate): Promise<User> {
    const result = await this.knex.raw(
      "INSERT INTO users (username, first_name, last_name, email, admin, password) VALUES (?, ?, ?, ?, ?, ?) RETURNING * ",
      [
        userData.username,
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.admin || false,
        userData.password,
      ]
    );
    return result.rows;
  }

  updateUser = async (
    id: number,
    userData: Partial<UserCreate>
  ): Promise<User | null> => {
    const result = await this.knex.raw(
      `UPDATE users SET name = ?, email = ?, password = ?, admin = ? WHERE id = ? RETURNING *;`,
      [
        userData.username,
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.password,
        userData.admin,
        id,
      ]
    );
    return result.rows[0] || null;
  };

  deleteUser = async (id: number): Promise<void> => {
    await this.knex.raw("DELETE FROM users WHERE id = ?;", [id]);
    console.log(`User with ID ${id} deleted successfully.`);
  };
}
let userModelInstance: UserModel | null = null;

export const getOrInitUserModel = (knexInstance: Knex): UserModel => {
  if (!userModelInstance) {
    userModelInstance = new UserModel(knexInstance);
  }
  return userModelInstance;
};
