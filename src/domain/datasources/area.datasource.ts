import AreaFromAreaEntity from "../entity/areas/areaFromArea.entity";

export default abstract class AreasDataSource {
    abstract getAll(): Promise<AreaFromAreaEntity[]>;
}
