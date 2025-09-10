import AreaFromAreaEntity from "../entity/areas/areaFromArea.entity";

export default abstract class AreasRepository {
    abstract getAll(): Promise<AreaFromAreaEntity[]>;
}