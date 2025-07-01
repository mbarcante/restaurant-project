export interface MenuItem {
    id: number,
    name: string,
    description: string,
    price: string,
    image_url: string,
    created_at: Date,
    updated_at: Date,
}

export interface CreateMenuItem {
    name: string,
    description: string,
    price: string,
    image_url: string,
}