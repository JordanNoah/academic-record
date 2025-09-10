import { DataTypes, Model } from "sequelize";
import { sequelizeSubjects } from "@/infrastructure/database/sequelize";

interface SubjectFromSubjectRow {
  id: number;
  uuid: string;
  abbr: string;                 // varchar(15)
  nameI18n: unknown;            // json
  description?: string | null;  // text
  options: unknown;             // json
  active: boolean;              // default true
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class SubjectFromSubjectSequelize extends Model<SubjectFromSubjectRow, Omit<SubjectFromSubjectRow, "id">>
{
  declare id: number;
  declare uuid: string;
  declare abbr: string;
  declare nameI18n: unknown;
  declare description?: string | null;
  declare options: unknown;
  declare active: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;
}

SubjectFromSubjectSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,         // si es TEXT en tu DB, cámbialo a DataTypes.TEXT
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    abbr: {
      type: DataTypes.STRING(15),
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
    sequelize: sequelizeSubjects,
    tableName: "subject",
    timestamps: true,   // created_at / updated_at
    underscored: true,
    paranoid: true,     // deleted_at
    indexes: [{ unique: true, fields: ["uuid"] }],
  }
);
