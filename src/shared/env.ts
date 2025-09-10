require('dotenv').config()

export default {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    DBAREAS: {
        HOST: process.env.DBAREAS_HOST || 'localhost',
        USER: process.env.DBAREAS_USER || 'root',
        PASSWORD: process.env.DBAREAS_PASSWORD || '1234',
        DIALECT: 'postgres',
        PORT: process.env.DBAREAS_PORT ? parseInt(process.env.DBAREAS_PORT) : 5432,
        DBNAME: process.env.DBAREAS_DBNAME || 'academic_record',
    },
    DBPROGRAMS: {
        HOST: process.env.DBPROGRAMS_HOST || 'localhost',
        USER: process.env.DBPROGRAMS_USER || 'root',
        PASSWORD: process.env.DBPROGRAMS_PASSWORD || '1234',
        DIALECT: 'postgres',
        PORT: process.env.DBPROGRAMS_PORT ? parseInt(process.env.DBPROGRAMS_PORT) : 5432,
        DBNAME: process.env.DBPROGRAMS_DBNAME || 'academic_record',
    },
    DBSUBJECTS: {
        HOST: process.env.DBSUBJECTS_HOST || 'localhost',
        USER: process.env.DBSUBJECTS_USER || 'root',
        PASSWORD: process.env.DBSUBJECTS_PASSWORD || '1234',
        DIALECT: 'postgres',
        PORT: process.env.DBSUBJECTS_PORT ? parseInt(process.env.DBSUBJECTS_PORT) : 5432,
        DBNAME: process.env.DBSUBJECTS_DBNAME || 'academic_record',
    }
}