import {Hono} from "hono";

export default class AppRoutes {
    public get routes(): Hono {
        const routes = new Hono();
        routes.get("/", (c) => {
            return c.json({
                status: 'success',
                info: {
                    Title: 'Students Synchronizer TS Service',
                    Version: '1.0.0',
                    Author: 'Teaching Action'
                }
            });
        });
        return routes;
    }
}
