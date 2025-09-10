import AreaFromAreaEntity from "@/domain/entity/areas/areaFromArea.entity";
import AreasRepository from "@/domain/repositories/area.repository";
import AreaDataSourceImpl from "../datasources/area.datasource.impl";

export default class AreasRepositoryImpl implements AreasRepository {
    private readonly areaDataSource: AreaDataSourceImpl;

    constructor() {
        this.areaDataSource = new AreaDataSourceImpl();
    }
    getAll(): Promise<AreaFromAreaEntity[]> {
        return this.areaDataSource.getAll();
    }
}