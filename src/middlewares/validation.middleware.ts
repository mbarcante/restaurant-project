import { Request, Response, NextFunction } from 'express';

export const validateUserCreationBasic = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        res.status(400).json({
            message: 'Validation failed',
            errors: [
                !name ? { field: 'name', message: 'Name is required' } : null,
                !email ? { field: 'email', message: 'Email is required' } : null,
                !password ? { field: 'password', message: 'Password is required' } : null,
            ].filter(Boolean)
        });
        return;
    }

    
    if (password && password.length < 6 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password) && !/\d/.test(password)) {
        res.status(400).json({
            message: 'Validation failed',
            errors: [{ field: 'password', message: 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number' }]
        });
        return;
    }
    next();
};

export default validateUserCreationBasic;
