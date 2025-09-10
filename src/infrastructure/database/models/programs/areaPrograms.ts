import { DataTypes, Model } from "sequelize";
import { sequelizePrograms } from "@/infrastructure/database/sequelize";

interface AreaProgramRow {
  areaId: number;
  programId: number;
}

export class AreaProgramSequelize
  extends Model<AreaProgramRow, AreaProgramRow>
  implements AreaProgramRow
{
  declare areaId: number;
  declare programId: number;
}

AreaProgramSequelize.init(
  {
    areaId: {
      field: "area_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    programId: {
      field: "program_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizePrograms,
    tableName: "area_program",
    timestamps: false,   // no tiene created_at / updated_at
    underscored: true,
    paranoid: false,
  }
);
