import { DbSequelize } from "@/infrastructure/database/init"
import { Hono } from "hono"
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import AppRoutes from "./routes";
import env from "@/shared/env";


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
            DbSequelize().then(async () => {
                    this.app.use('*', async (c, next) => {
                        const corsMiddleware = cors()
                        return await corsMiddleware(c, next)
                    })

                    this.app.get("/", (c) => {
                        return c.json({
                            status: "success",
                            message: "Welcome to sync student service"
                        });
                    });

                    this.app.route('/api', new AppRoutes().routes)
                    serve({
                        fetch: this.app.fetch,
                        port: this.port
                    }, (info) => {
                        console.log(`Server running on port ${info.port}`)
                    })
            }).catch(error => {
                console.log(error)
            })
            console.timeEnd('Server started in')
        } catch (e) {
            console.log(e)
        }
    }
}