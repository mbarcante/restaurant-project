import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routers/user.routes';
import authRoutes from './routers/auth.routes';
import db from './db';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

db.raw("Select 1")
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});