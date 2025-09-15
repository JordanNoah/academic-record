import { DataTypes, Model } from "sequelize";
import { sequelizeSubjects } from "@/infrastructure/database/sequelize";
import { AreasFromSubjectsSequelize } from "./areas";
import { SubjectFromSubjectSequelize } from "./subject";

interface AreaSubjectFromSubjectsRow {
  areaId: number;
  subjectId: number;
}

export class AreaSubjectFromSubjectsSequelize extends Model<AreaSubjectFromSubjectsRow>
{
  declare areaId: number;
  declare subjectId: number;
  declare area?: AreasFromSubjectsSequelize;
  declare subject?: SubjectFromSubjectSequelize;
}

AreaSubjectFromSubjectsSequelize.init(
  {
    areaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'area_id',
      primaryKey: true,
    },
    subjectId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'subject_id',
      primaryKey: true,
    },
  },
  {
    sequelize: sequelizeSubjects,
    tableName: 'area_subject',
    timestamps: false,
    underscored: true,
    paranoid: false
  }
);

AreaSubjectFromSubjectsSequelize.removeAttribute('id');

// Alias explícitos en las belongsTo del puente:
AreaSubjectFromSubjectsSequelize.belongsTo(AreasFromSubjectsSequelize, {
  foreignKey: 'area_id',
  as: 'area',
})
AreaSubjectFromSubjectsSequelize.belongsTo(SubjectFromSubjectSequelize, {
  foreignKey: 'subject_id',
  as: 'subject',
})

AreaSubjectFromSubjectsSequelize.belongsTo(AreasFromSubjectsSequelize, { foreignKey: 'area_id' });
AreaSubjectFromSubjectsSequelize.belongsTo(SubjectFromSubjectSequelize, { foreignKey: 'subject_id' });
