import { Router } from "express";
import userController from "../controllers/User.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware.authenticateJWT, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);

export default router;
