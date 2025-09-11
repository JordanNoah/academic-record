import SubjectFromSubjectsEntity from "../entity/subjects/subjectFromSubjects.entity";

export default abstract class SubjectRepository {
    abstract getAll(): Promise<SubjectFromSubjectsEntity[]>;
    abstract getSubjectsByAreas(areasUuid: string[]): Promise<SubjectFromSubjectsEntity[]>;
}