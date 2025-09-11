import ProgramEntity from "../entity/programs/programFromPrograms.entity";

export default abstract class ProgramDataSource {
    abstract getAllPrograms(): Promise<ProgramEntity[]>;
}