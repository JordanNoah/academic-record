import { SubjectFromSubjectSequelize } from "@/infrastructure/database/models/subjects/subject";
import AreaFromAreaEntity from "../areas/areaFromArea.entity";
import { AreaSubjectFromSubjectsSequelize } from "@/infrastructure/database/models/subjects/areasSubjects";
import { AreasFromSubjectsSequelize } from "@/infrastructure/database/models/subjects/areas";
import AreaFromSubjectEntity from "./areaFromSubject.entity";
import { mapperLangs } from "@/shared/trait";

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
        public area?: AreaFromAreaEntity | undefined,
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

    static areaSubjectFromSubjectRow(row: AreaSubjectFromSubjectsSequelize): SubjectFromSubjectsEntity {
        return new SubjectFromSubjectsEntity(
            row.subject!.id,
            row.subject!.uuid,
            row.subject!.abbr,
            mapperLangs(row.subject!.nameI18n),
            row.subject!.options,
            row.subject!.active,
            row.subject!.description,
            row.subject!.createdAt,
            row.subject!.updatedAt,
            row.subject!.deletedAt,
            undefined
        );
    }
}
