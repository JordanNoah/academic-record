import {Options} from 'sequelize'
import env from "@/shared/env"

export const config: Options = {
    host: env.DB.HOST,
    username: env.DB.USER,
    password: env.DB.PASSWORD,
    logging: false,
    port: env.DB.PORT,
    database: env.DB.NAME,
    dialect: 'postgres'
}