import ProgramEntity from "../entity/programs/programFromPrograms.entity";

export default abstract class ProgramRepository {
    abstract getAllPrograms(): Promise<ProgramEntity[]>;
}