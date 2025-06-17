export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    admin: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface UserCreate {
    name: string; 
    email: string;
    password: string; 
    admin?: boolean; 
}