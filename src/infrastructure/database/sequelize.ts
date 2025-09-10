import {Sequelize} from "sequelize";
import {
    configAreas,
    configPrograms,
    configSubjects
} from "./config";

export const sequelizeAreas = new Sequelize(configAreas)
export const sequelizePrograms = new Sequelize(configPrograms)
export const sequelizeSubjects = new Sequelize(configSubjects)