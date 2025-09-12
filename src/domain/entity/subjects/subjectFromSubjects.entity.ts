import { SubjectFromSubjectSequelize } from "@/infrastructure/database/models/subjects/subject";
import AreaFromAreaEntity from "../areas/areaFromArea.entity";

export default class SubjectFromSubjectsEntity {
    constructor(
        public id: number,
        public uuid: string,
        public abbr: string,
        public nameI18n: unknown,
        public options: unknown,
        public active: boolean,
        public description?: string | null,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date | null,
        public area?: AreaFromAreaEntity
    ){}

    static fromRow(row: SubjectFromSubjectSequelize): SubjectFromSubjectsEntity {
        return new SubjectFromSubjectsEntity(
            row.id,
            row.uuid,
            row.abbr,
            row.nameI18n,
            row.options,
            row.active,
            row.description,
            row.createdAt,
            row.updatedAt,
            row.deletedAt,
        );
    }
}
