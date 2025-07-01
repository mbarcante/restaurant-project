import type { NextFunction, Request, Response } from "express";
import userService from "../../services/User.service";

export const validateUserCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, first_name, last_name, email, password } = req.body;

  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    res.status(400).json({ error: "This email is already registered" });
  }

  if (!username || first_name || last_name || !email || !password) {
    res.status(400).json({
      message: "Validation failed",
      errors: [
        !username
          ? { field: "Username", message: "Username is required" }
          : null,
        !first_name
          ? { field: "First Name", message: "First Name is required" }
          : null,
        !last_name
          ? { field: "Last Name", message: "Last Name is required" }
          : null,
        !email ? { field: "email", message: "Email is required" }
          : null,
        !password
          ? { field: "password", message: "Password is required" }
          : null,
      ].filter(Boolean),
    });
    return;
  }

  if (
    password &&
    password.length < 6 &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password) &&
    !/\d/.test(password)
  ) {
    res.status(400).json({
      message: "Validation failed",
      errors: [
        {
          field: "password",
          message:
            "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number",
        },
      ],
    });
    return;
  }
  next();
};

export default validateUserCreation;
