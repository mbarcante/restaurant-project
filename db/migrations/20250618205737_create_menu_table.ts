import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS menu (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            image_url VARCHAR(255), -- Assuming you'll add an image URL
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await knex.raw(`
        CREATE TRIGGER set_menu_updated_at
        BEFORE UPDATE ON menu
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TRIGGER IF EXISTS set_menu_updated_at ON menu;
    `);
    await knex.raw(`
        DROP TABLE IF EXISTS menu;
    `);
}