import { DataTypes, Model } from "sequelize";
import { sequelizeSubjects } from "@/infrastructure/database/sequelize";

interface VersionFromSubjectsRow {
  id: number;
  uuid: string;
  subjectId: number;
  name: string;
  description?: string | null;
  credits: unknown;
  options?: unknown;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class VersionFromSubjectsSequelize extends Model<VersionFromSubjectsRow, Omit<VersionFromSubjectsRow, "id">>
{
  declare id: number;
  declare uuid: string;
  declare subjectId: number;
  declare name: string;
  declare description?: string | null;
  declare credits: unknown;
  declare options?: unknown;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;
}

VersionFromSubjectsSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID, // si en DB es TEXT, cámbialo a DataTypes.TEXT
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    subjectId: {
      field: "subject_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    sequelize: sequelizeSubjects,
    tableName: "version",
    timestamps: true,   // created_at / updated_at
    underscored: true,
    paranoid: true,     // deleted_at
    indexes: [{ unique: true, fields: ["uuid"] }],
  }
);
