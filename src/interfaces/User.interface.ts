export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    admin: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface UserCreate {
   username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    admin?: boolean;
}