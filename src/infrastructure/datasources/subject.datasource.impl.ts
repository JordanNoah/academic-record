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
            const where = areasUuid?.length
                ? { uuid: { [Op.in]: areasUuid } }
                : {}
            const areas = await AreasFromSubjectsSequelize.findAll({ where })

            if (!areas.length) return []

            const foundAreasUuid = areas.map(a => a.uuid)
            const notFoundAreas = areasUuid.filter(u => !foundAreasUuid.includes(u))
            if (notFoundAreas.length) {
                throw CustomError.notFound(`Areas not found: ${notFoundAreas.join(", ")}`)
            }            

            const areaSubject = await AreaSubjectFromSubjectsSequelize.findAll({
                attributes:["areaId","subjectId"],
                where: {
                    areaId: { [Op.in]: areas.map(a => a.id) }
                },
                include: [
                    {
                        model: SubjectFromSubjectSequelize,
                        as: 'subject',
                    },
                    {
                        model: AreasFromSubjectsSequelize,
                        as: 'area',
                    }
                ]
            });
            
            
            return areaSubject.map(as => {
                return SubjectFromSubjectsEntity.areaSubjectFromSubjectRow(as);
            });
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error
            throw CustomError.internalServer()
        }
    }

}