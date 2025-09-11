import ProgramRepositoryImpl from "@/infrastructure/repositories/program.repository.impl";
import { Context } from "hono";

export default class ProgramsController {
    private readonly programRepository: ProgramRepositoryImpl;

    constructor() {
        this.programRepository = new ProgramRepositoryImpl();
    }

    public getAll = async (c:Context) => {
        try {
            const programs = await this.programRepository.getAllPrograms();
            return c.json(programs);
        } catch (error) {
            return c.json({error}, 500);
        }
    }
}