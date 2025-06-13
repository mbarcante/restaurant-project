import knex from "knex";
import knexConfig from "../knexfile";

const enviroment = process.env.NODE_ENV || "development"; // Default to 'development' if NODE_ENV is not set
const config = knexConfig[enviroment];
const db = knex(config);

export default db