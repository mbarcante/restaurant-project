import {Router} from 'express'
import menuController from '../controllers/Menu.controller'

const router = Router()

router.get('/', menuController.getAllDishes)
router.post('/', menuController.createMenuItem)
router.patch('/:id', menuController.updateMenuItem)

export default router