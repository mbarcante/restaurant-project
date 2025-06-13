import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import db from '../db';

class UserController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel(db);
    }

    getAllUsers = async(req: Request, res: Response): Promise<void> => {
        try {
            console.log("Fetching all users from the database...");
            const users = await this.userModel.getAllUsers();
            res.json(users);

        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    getUserById = async(req: Request, res: Response): Promise<void> => {
        const userId = parseInt(req.params.id, 10);
        try {
            const user = await this.userModel.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log("Adding a new user to the database...");
            const newUser = await this.userModel.createUser(req.body);
            res.status(201).json("Usuário adicionado com sucesso: " + newUser.name);
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    updateUser = async (req: Request, res: Response): Promise<void> => {
        const userId = parseInt(req.params.id, 10);
        try {
            const updatedUser = await this.userModel.updateUser(userId, req.body);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    deleteUser = async (req: Request, res: Response): Promise<void> => {
        // const userId = parseInt(req.params.id, 10);
        // try {
        //     const deletedUser = await this.userModel.deleteUser(userId);
        //     if (deletedUser) {
        //         res.json({ message: "User deleted successfully" });
        //     } else {
        //         res.status(404).json({ error: "User not found" });
        //     }
        // } catch (error) {
        //     console.error("Error deleting user:", error);
        //     res.status(500).json({ error: "Internal Server Error" });
        // }
    }
}
const userController = new UserController();

export default userController;