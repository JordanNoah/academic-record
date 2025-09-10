import { DataTypes, Model } from "sequelize";
import { sequelizePrograms } from "@/infrastructure/database/sequelize";

interface ProgramTypeFromProgramsRow {
  id: number;
  name: string;             // varchar(10)
  nameI18n: unknown;        // json
  academicLevel: string;    // varchar(255)
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProgramTypeFromProgramsSequelize extends Model<ProgramTypeFromProgramsRow, Omit<ProgramTypeFromProgramsRow, "id">>
{
  declare id: number;
  declare name: string;
  declare nameI18n: unknown;
  declare academicLevel: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ProgramTypeFromProgramsSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nameI18n: {
      field: "name_i18n",
      type: DataTypes.JSON,
      allowNull: false,
    },
    academicLevel: {
      field: "academic_level",
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizePrograms,
    tableName: "program_type",
    timestamps: true,     // created_at / updated_at
    underscored: true,
    paranoid: false,      // no deleted_at en esta tabla
  }
);
