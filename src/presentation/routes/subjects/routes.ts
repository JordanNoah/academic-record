import { Hono } from "hono";
import SubjectsController from "./controller";

export default class SubjectsRoutes {
    public get routes(): Hono {
        const routes = new Hono()
        const controller = new SubjectsController()
        routes.get("/", controller.getAll)
        return routes
    }
}