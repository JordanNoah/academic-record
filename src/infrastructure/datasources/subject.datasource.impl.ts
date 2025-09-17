import SubjectDataSource from "@/domain/datasources/subject.datasource";
import SubjectFromSubjectsEntity from "@/domain/entity/subjects/subjectFromSubjects.entity";
import { CustomError } from "@/shared/custom.error";
import { SubjectFromSubjectSequelize } from "../database/models/subjects/subject";
import { AreaSubjectFromSubjectsSequelize } from "../database/models/subjects/areasSubjects";
import { AreasFromSubjectsSequelize } from "../database/models/subjects/areas";
import { Op } from "sequelize";
import AreaDataSourceImpl from "./area.datasource.impl";
import { PaginationDto } from "@/domain/dtos/pagination.dto";
import PaginatedEntity from "@/domain/entity/paginated.entity";

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
    async getSubjectsByAreas(areasUuid: string[], pagination: PaginationDto): Promise<PaginatedEntity<SubjectFromSubjectsEntity>> {
        try {            
            const where = areasUuid?.length
                ? { uuid: { [Op.in]: areasUuid } }
                : {}
            const areas = await new AreaDataSourceImpl().getAll()

            if (!areas.length) return new PaginatedEntity<SubjectFromSubjectsEntity>([],0,pagination.page,pagination.itemsPerPage,0) 

            const foundAreasUuid = areas.map(a => a.uuid)
            const notFoundAreas = areasUuid.filter(u => !foundAreasUuid.includes(u))
            if (notFoundAreas.length) {
                throw CustomError.notFound(`Areas not found: ${notFoundAreas.join(", ")}`)
            }            

            const areaSubject = await AreaSubjectFromSubjectsSequelize.findAndCountAll({
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
                ],
                limit: pagination.itemsPerPage,
                offset: (pagination.page - 1) * pagination.itemsPerPage,
            });
            
            const subjects = areaSubject.rows.map(as => {
                const subject = SubjectFromSubjectsEntity.areaSubjectFromSubjectRow(as);
                const area = areas.find(a => a.id === as.areaId);
                if(!area) throw CustomError.internalServer("Area not found for subject");
                subject.area = area
                return subject;
            });

            return new PaginatedEntity<SubjectFromSubjectsEntity>(subjects, areaSubject.count, pagination.page, pagination.itemsPerPage, Math.ceil(areaSubject.count / pagination.itemsPerPage));
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) throw error
            throw CustomError.internalServer()
        }
    }

}