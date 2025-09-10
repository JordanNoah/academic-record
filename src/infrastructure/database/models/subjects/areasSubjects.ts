import { DataTypes, Model } from "sequelize";
import { sequelizeSubjects } from "@/infrastructure/database/sequelize";

interface AreaSubjectFromSubjectsRow {
  areaId: number;
  subjectId: number;
}

export class AreaSubjectFromSubjectsSequelize extends Model<AreaSubjectFromSubjectsRow, AreaSubjectFromSubjectsRow>
{
  declare areaId: number;
  declare subjectId: number;
}

AreaSubjectFromSubjectsSequelize.init(
  {
    areaId: {
      field: "area_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    subjectId: {
      field: "subject_id",
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeSubjects,
    tableName: "area_subject",
    timestamps: false,   // no tiene created_at / updated_at
    underscored: true,
    paranoid: false,
  }
);
