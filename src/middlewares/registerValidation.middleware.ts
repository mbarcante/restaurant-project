import {Request, Response, NextFunction} from 'express';
import {User} from '../interfaces/User.interface'; // Assuming User interface is defined here
import userService from '../services/User.service';

const RegisterValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confirmPassword } = req.body;
  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "This email is already registered" });
    next();
  }

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
    
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  // Additional validation can be added here (e.g., regex for email format)

  next();
}