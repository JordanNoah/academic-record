import { DataTypes, Model } from "sequelize";
import { sequelizeSubjects } from "@/infrastructure/database/sequelize";

interface AreasFromSubjectsRow {
  id: number;
  uuid: string;
  abbr: string;       // VARCHAR(5)
  name: string;       // VARCHAR(255)
}

export class AreasFromSubjectsSequelize extends Model<AreasFromSubjectsRow, Omit<AreasFromSubjectsRow, "id">> {
  declare id: number;
  declare uuid: string;
  declare abbr: string;
  declare name: string;
}

AreasFromSubjectsSequelize.init(
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
    tableName: "areas_programs",
    timestamps: false,   // la tabla no tiene created_at/updated_at
    underscored: true,
    paranoid: false,
  }
);
