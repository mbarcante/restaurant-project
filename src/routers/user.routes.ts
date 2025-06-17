import { Router } from 'express';
import userController from '../controllers/User.controller';
import validateUserCreationBasic from '../middlewares/validation.middleware';

const router = Router();

router.get('/', userController.getAllUsers); 
router.get('/:id', userController.getUserById);
router.post('/new', validateUserCreationBasic, userController.createUser);
router.patch('/:id', userController.updateUser);

export default router;