import { AreasFromSubjectsSequelize } from "@/infrastructure/database/models/subjects/areas";

export default class AreaFromSubjectEntity {
    constructor(
        public id: number,
        public uuid: string,
        public abbr: string,
        public name: string
    ){}

    static fromRow(row: AreasFromSubjectsSequelize): AreaFromSubjectEntity {
        return new AreaFromSubjectEntity(
            row.id,
            row.uuid,
            row.abbr,
            row.name
        );
    }
}