import {Options} from 'sequelize'
import env from "@/shared/env"

export const configAreas: Options = {
    host: env.DBAREAS.HOST,
    username: env.DBAREAS.USER,
    password: env.DBAREAS.PASSWORD,
    logging: false,
    port: env.DBAREAS.PORT,
    database: env.DBAREAS.DBNAME,
    dialect: 'postgres'
}

export const configPrograms: Options = {
    host: env.DBPROGRAMS.HOST,
    username: env.DBPROGRAMS.USER,  
    password: env.DBPROGRAMS.PASSWORD,
    logging: false,
    port: env.DBPROGRAMS.PORT,
    database: env.DBPROGRAMS.DBNAME,
    dialect: 'postgres'
}

export const configSubjects: Options = {
    host: env.DBSUBJECTS.HOST,
    username: env.DBSUBJECTS.USER,
    password: env.DBSUBJECTS.PASSWORD,
    logging: false,
    port: env.DBSUBJECTS.PORT,
    database: env.DBSUBJECTS.DBNAME,
    dialect: 'postgres'
}