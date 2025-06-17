import {Router} from 'express';
import authController from '../controllers/Auth.controller';
import validateUserCreation from '../middlewares/user/validation.middleware';

const router = Router();

router.post('/login', authController.login);
router.post("/new", validateUserCreation, authController.register);


export default router;