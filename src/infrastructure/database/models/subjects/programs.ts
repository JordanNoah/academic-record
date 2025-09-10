import { DataTypes, Model } from "sequelize";
import { sequelizeSubjects } from "@/infrastructure/database/sequelize";

interface ProgramFromSubjectsRow {
  id: number;
  uuid: string;
  abbr: string;
  version: string;
  name: string;
}

export class ProgramFromSubjectsSequelize extends Model<ProgramFromSubjectsRow, Omit<ProgramFromSubjectsRow, "id">>
{
  declare id: number;
  declare uuid: string;
  declare abbr: string;
  declare version: string;
  declare name: string;
}

ProgramFromSubjectsSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID, // si en DB lo tienes como TEXT, cambia a DataTypes.TEXT
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    abbr: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeSubjects,
    tableName: "program",
    timestamps: false,   // no hay created_at / updated_at
    underscored: true,
    paranoid: false,     // no deleted_at
    indexes: [{ unique: true, fields: ["uuid"] }],
  }
);
