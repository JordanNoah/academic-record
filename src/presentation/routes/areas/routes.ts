import { Hono } from "hono";
import AreasController from "./controller";

export default class AreasRoutes {

    public get routes(): Hono {
        const routes = new Hono()
        const controller = new AreasController()
        routes.get('/', controller.getAll)
        return routes
    }
}