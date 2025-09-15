import AreasRepository from "@/domain/repositories/area.repository";
import AreasRepositoryImpl from "@/infrastructure/repositories/area.repository.impl";
import { Context } from "hono";

export default class AreasController {
    private readonly areaRepository: AreasRepositoryImpl;

    constructor() {
        this.areaRepository = new AreasRepositoryImpl();
    }

    public getAll = async (c:Context) => {
        try {
            const areas = await this.areaRepository.getAll();
            return c.json(areas);
        } catch (error) {
            return c.json({error}, 500);
        }
    }
}