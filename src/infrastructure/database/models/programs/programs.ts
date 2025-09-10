import { DataTypes, Model } from "sequelize";
import { sequelizePrograms } from "@/infrastructure/database/sequelize";

interface ProgramFromProgramsRow {
  id: number;
  uuid: string;
  programTypeId: number;
  abbr: string;
  nameI18n: unknown;
  description?: string | null;
  options: unknown;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class ProgramsFromProgramSequelize extends Model<ProgramFromProgramsRow, Omit<ProgramFromProgramsRow, "id">>
{
  declare id: number;
  declare uuid: string;
  declare programTypeId: number;
  declare abbr: string;
  declare nameI18n: unknown;
  declare description?: string | null;
  declare options: unknown;
  declare active: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;
}

ProgramsFromProgramSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID, // si en tu DB está como TEXT, cámbialo a DataTypes.TEXT
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    programTypeId: {
      field: "program_type_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    abbr: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    nameI18n: {
      field: "name_i18n",
      type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: sequelizePrograms,
    tableName: "program",
    timestamps: true,    // created_at / updated_at
    underscored: true,
    paranoid: true,      // deleted_at
    indexes: [{ unique: true, fields: ["uuid"] }],
  }
);
