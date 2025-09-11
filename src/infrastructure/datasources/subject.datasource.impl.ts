import SubjectDataSource from "@/domain/datasources/subject.datasource";
import SubjectFromSubjectsEntity from "@/domain/entity/subjects/subjectFromSubjects.entity";
import { CustomError } from "@/shared/custom.error";
import { SubjectFromSubjectSequelize } from "../database/models/subjects/subject";

export default class SubjectDataSourceImpl implements SubjectDataSource {
    async getSubjects(): Promise<SubjectFromSubjectsEntity[]> {
        try {
            const subjects = await SubjectFromSubjectSequelize.findAll()
            return subjects.map(SubjectFromSubjectsEntity.fromRow);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
}