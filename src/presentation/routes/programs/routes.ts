import { Hono } from "hono";
import ProgramsController from "./controller";

export default class ProgramsRoutes {
    public get routes(): Hono {
        const routes = new Hono()
        const controller = new ProgramsController()
        routes.get("/", controller.getAll)
        return routes
    }
}