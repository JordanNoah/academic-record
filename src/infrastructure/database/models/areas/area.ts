import { DataTypes, Model } from "sequelize";
import { sequelizeAreas } from "@/infrastructure/database/sequelize";

interface AreaRow {
  id: number;
  uuid: string;
  abbr: string;
  nameI18n: unknown;              // JSON
  description?: string | null;    // TEXT (nullable)
  options: unknown;               // JSON
  active: boolean;                // default true
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class AreaSequelize extends Model<AreaRow, Omit<AreaRow, "id">> {
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

AreaSequelize.init(
  {
    id: {
      type: DataTypes.BIGINT,          // BIGINT en PG
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,            // columna uuid
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    abbr: {
      type: DataTypes.STRING(5),       // character varying(5)
      allowNull: false,
    },
    nameI18n: {
      field: "name_i18n",
      type: DataTypes.JSON,            // json
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,            // nullable
      allowNull: true,
    },
    options: {
      type: DataTypes.JSON,            // json NOT NULL
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
    sequelize: sequelizeAreas,
    tableName: "area",
    timestamps: true,    // created_at / updated_at
    underscored: true,   // mapea snake_case
    paranoid: true,      // deleted_at
    indexes: [{ unique: true, fields: ["uuid"] }],
  }
);
