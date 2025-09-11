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

    public getByAreas = async (c:Context) => {
        try {
            const { areasUuid } = await c.req.json();
            if (!Array.isArray(areasUuid) || areasUuid.some(u => typeof u !== 'string' || u.trim() === '')) {
                return c.json({ error: 'areasUuid must be a non-empty array of strings' }, 400);
            }
            const subjects = await this.subjectRepository.getSubjectsByAreas(areasUuid);
            return c.json(subjects);
        } catch (error) {
            console.log(error);
            
            return c.json({error}, 500);
        }
    }
}
