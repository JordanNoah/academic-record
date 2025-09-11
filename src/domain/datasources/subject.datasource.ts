import SubjectFromSubjectsEntity from "../entity/subjects/subjectFromSubjects.entity";

export default abstract class SubjectDataSource {
  abstract getSubjects(): Promise<SubjectFromSubjectsEntity[]>;
}