import SubjectRepository from "@/domain/repositories/subject.repository";
import SubjectDataSourceImpl from "../datasources/subject.datasource.impl";
import SubjectFromSubjectsEntity from "@/domain/entity/subjects/subjectFromSubjects.entity";

export default class SubjectRepositoryImpl implements SubjectRepository {
    private readonly subjectDataSource: SubjectDataSourceImpl;

    constructor() {
        this.subjectDataSource = new SubjectDataSourceImpl();
    }

    getAll(): Promise<SubjectFromSubjectsEntity[]> {
        return this.subjectDataSource.getSubjects();
    }
}