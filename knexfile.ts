import type { Knex } from 'knex'; // Import the Knex type for better IntelliSense

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // Specifies that you are using PostgreSQL
    connection: {
      // Use environment variables for database credentials.
      // 'db' matches the service name of your PostgreSQL container in docker-compose.yml
      host: process.env.DB_HOST || 'localhost', // Default to localhost if DB_HOST isn't set (for local dev without Docker)
      port: parseInt(process.env.DB_PORT || '5432', 10), // Parse port as integer
      user: process.env.DB_USER || 'myuser',      // Default user
      password: process.env.DB_PASSWORD || 'mypassword', // Default password
      database: process.env.DB_NAME || 'mydatabase',    // Default database name
    },
    migrations: {
      directory: './db/migrations', // Path to your migration files
      tableName: 'knex_migrations', // Name of the table Knex uses to track applied migrations
      extension: 'ts', // Important: Tells Knex to look for TypeScript (.ts) migration files
    },
    seeds: {
      directory: './db/seeds', // Path to your seed files (optional)
      extension: 'ts', // Important: Tells Knex to look for TypeScript (.ts) seed files
    },
  },

  // You would typically add configurations for other environments like 'staging' and 'production' here.
  // Example for production (would use different env vars/defaults):
  // production: {
  //   client: 'pg',
  //   connection: {
  //     host: process.env.PROD_DB_HOST,
  //     port: parseInt(process.env.PROD_DB_PORT || '5432', 10),
  //     user: process.env.PROD_DB_USER,
  //     password: process.env.PROD_DB_PASSWORD,
  //     database: process.env.PROD_DB_NAME,
  //     ssl: { rejectUnauthorized: false } // Only if your production DB requires SSL and you accept self-signed certs
  //   },
  //   migrations: {
  //     directory: './db/migrations',
  //     tableName: 'knex_migrations',
  //     extension: 'ts',
  //   },
  //   seeds: {
  //     directory: './db/seeds',
  //     extension: 'ts',
  //   },
  // },
};

export default config; // Export the configuration