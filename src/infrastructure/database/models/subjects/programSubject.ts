import { DataTypes, Model } from "sequelize";
import { sequelizeSubjects } from "@/infrastructure/database/sequelize";

interface ProgramVersionFromSubjectsRow {
  programId: number;
  versionId: number;
}

export class ProgramVersionFromSubjectsSequelize extends Model<ProgramVersionFromSubjectsRow, ProgramVersionFromSubjectsRow>{
  declare programId: number;
  declare versionId: number;
}

ProgramVersionFromSubjectsSequelize.init(
  {
    programId: {
      field: "program_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    versionId: {
      field: "version_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeSubjects,
    tableName: "program_version",
    timestamps: false,   // no created_at ni updated_at
    underscored: true,
    paranoid: false,
  }
);
