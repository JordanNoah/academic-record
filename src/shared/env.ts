export default {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        USER: process.env.DB_USER || 'root',
        PASSWORD: process.env.DB_PASSWORD || '',
        DIALECT: 'mysql',
        PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        
    }
}