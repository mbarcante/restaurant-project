import type { NextFunction, Request, Response } from "express";
import type { User } from "../interfaces/User.interface"; // Assuming User interface is defined here
import type { AuthService } from "../services/Auth.service";
import authServiceInstance from "../services/Auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}

export class AuthMiddleware {
  private authService: AuthService;
  constructor() {
    this.authService = authServiceInstance;
  }

  authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: No token provided." });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized: Invalid token format." });
      return;
    }
    try {
      const decoded = this.authService.verifyToken(token);
      req.user = decoded as Partial<User>;
      next();
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "name" in error) {
        console.error("Error during JWT authentication:", error);
        if (error.name === "TokenExpiredError") {
          res
            .status(401)
            .json({ error: "Authentication failed: Token has expired." });
        } else if (error.name === "JsonWebTokenError") {
          res
            .status(401)
            .json({ error: "Authentication failed: Invalid token." });
        } else {
          res.status(401).json({
            error: "Authentication failed: An unexpected error occurred.",
          });
        }
      }
      return;
    }
  };

  authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(403).json({ error: "Forbidden: User not authenticated." });
      return;
    }

    if (req.user.admin) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden: User is not an admin." });
    }
  };
}

export default new AuthMiddleware();
