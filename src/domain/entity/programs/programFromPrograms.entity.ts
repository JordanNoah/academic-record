import { ProgramsFromProgramSequelize } from "@/infrastructure/database/models/programs/programs";
import { mapperLangs } from "@/shared/trait";

export default class ProgramEntity {
    constructor(
        public id: number,
        public uuid: string,
        public programTypeId: number,
        public abbr: string,
        public nameI18n: unknown,
        public options: unknown,
        public active: boolean,
        public description?: string | null,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date | null
    ){}

    static fromRow(row: ProgramsFromProgramSequelize): ProgramEntity {
        return new ProgramEntity(
            row.id,
            row.uuid,
            row.programTypeId,
            row.abbr,
            mapperLangs(row.nameI18n),
            row.options,
            row.active,
            row.description,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        );
    }
}