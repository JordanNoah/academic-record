import { AreaSequelize } from "@/infrastructure/database/models/areas/area";
import { mapperLangs } from "@/shared/trait";

export default class AreaFromAreaEntity {
    constructor(
        public id: number,
        public uuid: string,
        public abbr: string,
        public translations: unknown,
        public options: unknown,
        public active: boolean,
        public description?: string | null,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date | null,
    ){}

    static fromRow(row: AreaSequelize): AreaFromAreaEntity {
        return new AreaFromAreaEntity(
            row.id,
            row.uuid,
            row.abbr,
            mapperLangs(row.nameI18n),
            row.options,
            row.active,
            row.description,
            row.createdAt,
            row.updatedAt,
            row.deletedAt,
        );
    }
}