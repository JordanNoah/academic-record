import ProgramDataSource from "@/domain/datasources/program.datasource";
import ProgramEntity from "@/domain/entity/programs/programFromPrograms.entity";
import { CustomError } from "@/shared/custom.error";
import { ProgramsFromProgramSequelize } from "../database/models/programs/programs";

export default class ProgramDataSourceImpl implements ProgramDataSource {
    async getAllPrograms(): Promise<ProgramEntity[]> {
        try {
            const programs = await ProgramsFromProgramSequelize.findAll()
            return programs.map(ProgramEntity.fromRow);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
}