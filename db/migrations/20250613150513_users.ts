import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    console.log("Creating users table...");
    await knex.raw(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `)
    console.log("Users table created successfully.");
}


export async function down(knex: Knex): Promise<void> {
    console.log("Dropping users table...")
    await knex.raw(`
        DROP TABLE IF EXISTS users;
    `);
    console.log("Users table dropped successfully.");
}

