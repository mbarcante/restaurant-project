import { Knex } from "knex";
import { MenuItem, CreateMenuItem } from "src/interfaces/Menu.interface";

class MenuModel {
  private knex: Knex;
  constructor(knexInstance: Knex) {
    this.knex = knexInstance;
  }
  getAllMenuItems = async (): Promise<MenuItem[]> => {
    const result = await this.knex.raw('SELECT  id, name, description, price, image_url FROM menu_items')
    console.log("Raw Knex Result:", result); // See the full object
    console.log("Extracted Rows:", result.rows); // See just the array of data
    return result.rows
  };
  
  createMenuItem = async (menuItemData: CreateMenuItem): Promise<MenuItem[]> => {
    const result = await this.knex.raw(
        `INSERT INTO menu_items (name, description, price, image_url)
         VALUES( ?, ?, ?, ? )
         RETURNING *;`,
        [menuItemData.name, menuItemData.description, menuItemData.price, menuItemData.image_url])
    return result.rows
  }

  updateMenuItem = async (id: number, menuItemData: Partial<CreateMenuItem>): Promise<MenuItem | null > => {
    const updatedMenuItem = await this.knex.raw(`UPDATE menu_items SET name=?, description=?, price=?, image_url=? WHERE id = ? RETURNING *;`,
        [menuItemData.name, menuItemData.description, menuItemData.price, menuItemData.image_url, id]
    ) 
    return updatedMenuItem
  }

  deleteMenuItem = async (id: number) => {
    await this.knex.raw(`DELETE FROM menu_items WHERE id = ?;`[id])
    console.log(`Dish with id ${id} deleted successfully`)
  }
}

let menuModelInstance: MenuModel | null = null

export const getOrInitMenuModel = (knexInstance: Knex): MenuModel => {
    if(!menuModelInstance){
        menuModelInstance = new MenuModel(knexInstance)
    }
    return menuModelInstance
}
