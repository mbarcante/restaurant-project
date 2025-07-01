import {MenuItem, CreateMenuItem} from "../interfaces/Menu.interface"
import menuServiceInstance from "../services/Menu.service"
import { Request, Response } from 'express';

export class MenuController {
    private menuService: typeof menuServiceInstance = menuServiceInstance
    getAllDishes = async (req: Request, res: Response): Promise<void> => {
        try{
            const menu = await this.menuService.getAllMenuItems()
            res.json(menu)
        }catch(error){
            console.log("Error fetching menu")
             res.status(500).json({ error: "Internal Server Error" });
        }
    }
    createMenuItem = async (req: Request, res: Response): Promise<void> => {
        try{
        const newMenuItem = req.body
        const priceString = req.body.price
        const priceNumber = parseFloat(priceString.replace(',', '.'))
        const createdMenuItem = await this.menuService.createMenuItem(newMenuItem)
        res.status(201).json({success: "Menu item successfully created", data: createdMenuItem})
        }catch(error){
            console.log("Error creating a new menu item")
            res.status(500).json({error: "Internal Server Error"})
        }
    }
    updateMenuItem = async (req: Request, res: Response): Promise<void> =>{
        try{
        const updates = req.body
        const idString = req.params.id
        const id: number = parseInt(idString)
        const updatedMenuItem = await this.menuService.updateMenuItem(id, updates)
        res.status(201).json({})
        }catch(error){
            console.log("Error updateding a menu item")
            res.status(500).json({error: "Internal Server Error"})
        }
    }
}
const menuController = new MenuController()

export default menuController