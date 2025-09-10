import AreasDataSource from "@/domain/datasources/area.datasource";
import AreaFromAreaEntity from "@/domain/entity/areas/areaFromArea.entity";
import { CustomError } from "@/shared/custom.error";
import { AreaSequelize } from "../database/models/areas/area";

export default class AreaDataSourceImpl implements AreasDataSource {
    async getAll(): Promise<AreaFromAreaEntity[]> {
        try {
            const areas = await AreaSequelize.findAll();
            return areas.map(area => AreaFromAreaEntity.fromRow(area));
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }
}