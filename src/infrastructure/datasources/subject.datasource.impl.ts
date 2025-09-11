import SubjectDataSource from "@/domain/datasources/subject.datasource";
import SubjectFromSubjectsEntity from "@/domain/entity/subjects/subjectFromSubjects.entity";
import { CustomError } from "@/shared/custom.error";
import { SubjectFromSubjectSequelize } from "../database/models/subjects/subject";
import { AreaSubjectFromSubjectsSequelize } from "../database/models/subjects/areasSubjects";
import { AreasFromSubjectsSequelize } from "../database/models/subjects/areas";
import { Op } from "sequelize";

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

    /**
   * Variante A: 1–N (Subject.areaUuid FK)
   */
    async getSubjectsByAreas(areasUuid: string[]): Promise<SubjectFromSubjectsEntity[]> {
        try {
            const areas = await AreasFromSubjectsSequelize.findAll({
                attributes: ['uuid'],
                where: { uuid: { [Op.in]: areasUuid } }
            })

            // detectar las que no existen
            const foundUuids = areas.map(a => a.uuid)
            const missing = areasUuid.filter(u => !foundUuids.includes(u))

            if (missing.length > 0) {
                throw CustomError.notFound(`Areas not found: ${missing.join(', ')}`)
            }

            const areaSubjects = await AreaSubjectFromSubjectsSequelize.findAll({
                where: { areaId: { [Op.in]: foundUuids } }
            })

            const subjects = await SubjectFromSubjectSequelize.findAll({
                where: { uuid: { [Op.in]: areaSubjects.map(as => as.subjectId) } }
            })

            return subjects.map(SubjectFromSubjectsEntity.fromRow)
        } catch (error) {
            if (error instanceof CustomError) throw error
            throw CustomError.internalServer()
        }
    }

}