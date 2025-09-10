import {Hono} from "hono";
import areas from "./areas/routes";
import programs from "./programs/routes";
import subjects from "./subjects/routes";

export default class AppRoutes {
    public get routes(): Hono {
        const routes = new Hono();
        routes.get("/", (c) => {
            return c.json({
                status: 'success',
                info: {
                    Title: 'Academic Reader TS Service',
                    Version: '1.0.0',
                    Author: 'Teaching Managment'
                }
            });
        });
        routes.route('/areas', new areas().routes);
        routes.route('/programs', new programs().routes);
        routes.route('/subjects', new subjects().routes);
        return routes;
    }
}
