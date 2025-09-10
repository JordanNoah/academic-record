import { DataTypes, Model } from "sequelize";
import { sequelizePrograms } from "@/infrastructure/database/sequelize";

interface VersionFromProgramsRow {
  id: number;
  uuid: string;
  programId: number;
  name: string;
  description?: string | null;
  status: string;
  modality?: string | null;
  trainingType?: string | null;
  credits: unknown;
  options?: unknown;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class VersionFromProgramsSequelize extends Model<VersionFromProgramsRow, Omit<VersionFromProgramsRow, "id">>
{
  declare id: number;
  declare uuid: string;
  declare programId: number;
  declare name: string;
  declare description?: string | null;
  declare status: string;
  declare modality?: string | null;
  declare trainingType?: string | null;
  declare credits: unknown;
  declare options?: unknown;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;
}

VersionFromProgramsSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID, // si en DB lo manejas como TEXT, cámbialo a DataTypes.TEXT
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    programId: {
      field: "program_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    modality: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    trainingType: {
      field: "training_type",
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    credits: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    sequelize: sequelizePrograms,
    tableName: "version",
    timestamps: true,    // created_at / updated_at
    underscored: true,
    paranoid: true,      // deleted_at
    indexes: [{ unique: true, fields: ["uuid"] }],
  }
);
