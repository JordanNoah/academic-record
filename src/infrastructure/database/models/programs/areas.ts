import { DataTypes, Model } from "sequelize";
import { sequelizePrograms } from "@/infrastructure/database/sequelize";

interface AreasFromProgramsRow {
  id: number;
  uuid: string;
  abbr: string;          // VARCHAR(5)
  nameI18n: unknown;     // JSON
}

export class AreasFromProgramsSequelize extends Model<AreasFromProgramsRow, Omit<AreasFromProgramsRow, "id">> {
  declare id: number;
  declare uuid: string;
  declare abbr: string;
  declare nameI18n: unknown;
}

AreasFromProgramsSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,      // si en DB es TEXT, cambia a DataTypes.TEXT
      allowNull: false,
    },
    abbr: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    nameI18n: {
      field: "name_i18n",
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizePrograms,
    tableName: "areas_programs",
    timestamps: false,   // la tabla no tiene created_at/updated_at
    underscored: true,
    paranoid: false,
  }
);
