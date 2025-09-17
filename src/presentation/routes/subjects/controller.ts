import { PaginationDto } from "@/domain/dtos/pagination.dto";
import SubjectRepository from "@/domain/repositories/subject.repository";
import SubjectRepositoryImpl from "@/infrastructure/repositories/subject.repository.impl";
import { Context } from "hono";

export default class SubjectsController {
    private readonly subjectRepository: SubjectRepositoryImpl;

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
            const { areas, pagination } = await c.req.json();
            if (!Array.isArray(areas)) {
                return c.json({ error: 'areas must be a non-empty array of strings' }, 400);
            }
            if (!pagination) {
                return c.json({ error: 'pagination is required' }, 400);
            }
            const [paginationError, paginationDto] = PaginationDto.create(pagination);
            if (paginationError) {
                return c.json({ error: paginationError }, 400);
            }
            const subjects = await this.subjectRepository.getSubjectsByAreas(areas, paginationDto!);            
            return c.json(subjects);
        } catch (error) {            
            return c.json({ error }, 500);
        }
    }
}
