import { PaginationDto } from "../dtos/pagination.dto";
import PaginatedEntity from "../entity/paginated.entity";
import SubjectFromSubjectsEntity from "../entity/subjects/subjectFromSubjects.entity";

export default abstract class SubjectRepository {
    abstract getAll(): Promise<SubjectFromSubjectsEntity[]>;
    abstract getSubjectsByAreas(areasUuid: string[], pagination: PaginationDto): Promise<PaginatedEntity<SubjectFromSubjectsEntity>>
}