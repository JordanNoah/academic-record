import { DbSequelize } from "@/infrastructure/database/init"
import { Hono } from "hono"
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import AppRoutes from "./routes";
import env from "@/shared/env";
import { sequelizeAreas, sequelizePrograms, sequelizeSubjects } from "@/infrastructure/database/sequelize";


interface Options {
    port?: number
}

export class Server {
    public readonly app: Hono
    private readonly port: number

    constructor(options: Options) {
        const { port = env.PORT } = options
        this.app = new Hono()
        this.port = port
    }

    public async start() {
        try {
            console.time('Server started in')
            this.app.use('*', async (c, next) => {
                const corsMiddleware = cors()
                return await corsMiddleware(c, next)
            })

            this.app.get("/", async (c) => {
                const checkConnection = async (sequelize: any): Promise<boolean> => {
                    try {
                        await sequelize.authenticate();
                        return true;
                    } catch (error) {
                        console.error(error);
                        return false;
                    }
                };

                return c.json({
                    DBAREAS: await checkConnection(sequelizeAreas),
                    DBPROGRAMS: await checkConnection(sequelizePrograms),
                    DBSUBJECTS: await checkConnection(sequelizeSubjects),
                });
            });


            this.app.route('/api', new AppRoutes().routes)
            serve({
                fetch: this.app.fetch,
                port: this.port
            }, (info) => {
                console.log(`Server running on port ${info.port}`)
            })
            console.timeEnd('Server started in')
        } catch (e) {
            console.log(e)
        }
    }
}