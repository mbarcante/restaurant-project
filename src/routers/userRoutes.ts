import { Router } from 'express';
import userController from '../controllers/UserController'; 

const router = Router();

router.get('/', userController.getAllUsers); 
router.get('/:id', userController.getUserById);
router.post('/new', userController.createUser);
router.patch('/:id', userController.updateUser);

export default router;