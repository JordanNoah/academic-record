import SubjectRepository from "@/domain/repositories/subject.repository";
import SubjectRepositoryImpl from "@/infrastructure/repositories/subject.repository.impl";
import { Context } from "hono";

export default class SubjectsController {
    private readonly subjectRepository: SubjectRepository;

    constructor() {
        this.subjectRepository = new SubjectRepositoryImpl();
    }

    public getAll = async (c:Context) => {
        try {
            const subjects = await this.subjectRepository.getAll();
            return c.json(subjects);
        } catch (error) {
            return c.json({error}, 500);
        }
    }
}
