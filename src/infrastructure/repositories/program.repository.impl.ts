import ProgramEntity from "@/domain/entity/programs/programFromPrograms.entity";
import ProgramRepository from "@/domain/repositories/program.repository";
import ProgramDataSourceImpl from "../datasources/program.datasource.impl";

export default class ProgramRepositoryImpl implements ProgramRepository {
    private readonly programDataSource: ProgramDataSourceImpl;

    constructor() {
        this.programDataSource = new ProgramDataSourceImpl();
    }

    getAllPrograms(): Promise<ProgramEntity[]> {
        return this.programDataSource.getAllPrograms();
    }
}