import SubjectRepository from "@/domain/repositories/subject.repository";
import SubjectDataSourceImpl from "../datasources/subject.datasource.impl";
import SubjectFromSubjectsEntity from "@/domain/entity/subjects/subjectFromSubjects.entity";
import { PaginationDto } from "@/domain/dtos/pagination.dto";
import PaginatedEntity from "@/domain/entity/paginated.entity";

export default class SubjectRepositoryImpl implements SubjectRepository {
    private readonly subjectDataSource: SubjectDataSourceImpl;

    constructor() {
        this.subjectDataSource = new SubjectDataSourceImpl();
    }

    getAll(): Promise<SubjectFromSubjectsEntity[]> {
        return this.subjectDataSource.getSubjects();
    }

    getSubjectsByAreas(areasUuid: string[], pagination: PaginationDto): Promise<PaginatedEntity<SubjectFromSubjectsEntity>> {
        return this.subjectDataSource.getSubjectsByAreas(areasUuid, pagination);
    }
}