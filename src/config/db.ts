import knex from "knex";
import knexConfig from "../../knexfile";
import { getOrInitUserModel } from "../models/User.model"; 
import { getOrInitMenuModel } from "../models/Menu.model";

const enviroment = process.env.NODE_ENV || "development"; 
const config = knexConfig[enviroment];
const db = knex(config);
const userModelSingleton = getOrInitUserModel(db);
const menuModelSingleton = getOrInitMenuModel(db);


export { db, userModelSingleton, menuModelSingleton };


