import { AreaSequelize } from "@/infrastructure/database/models/areas/area";

export default class AreaFromAreaEntity {
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
    ){}

    static fromRow(row: AreaSequelize): AreaFromAreaEntity {
        return new AreaFromAreaEntity(
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