import knex from "knex";
import knexConfig from "../knexfile";
import { getOrInitUserModel } from "./models/User.model"; 

const enviroment = process.env.NODE_ENV || "development"; 
const config = knexConfig[enviroment];
const db = knex(config);
const userModelSingleton = getOrInitUserModel(db);


export { db, userModelSingleton };


