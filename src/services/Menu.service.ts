import { menuModelSingleton } from "../config/db";
import {MenuItem, CreateMenuItem} from "../interfaces/Menu.interface"

export class MenuService {
 async getAllMenuItems(): Promise<MenuItem[]>  {
    return menuModelSingleton.getAllMenuItems()
 }
 async createMenuItem(menuItem: CreateMenuItem): Promise<MenuItem[]> {
   return menuModelSingleton.createMenuItem(menuItem)
}
async updateMenuItem(menuItemId: number, menuItemData: Partial<CreateMenuItem>){
   return menuModelSingleton.updateMenuItem(menuItemId, menuItemData)
}
async deleteMenuItem(menuItemId: number){
   return menuModelSingleton.deleteMenuItem(menuItemId)
}

}

export default new MenuService()